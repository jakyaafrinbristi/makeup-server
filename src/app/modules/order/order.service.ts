


import { IUser } from "../user/user.interface";
import Order from "./order.model";
import Product from "../product/product.model";
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { IOrder, OrderStatus } from "./order.interface";
import { orderUtils } from "./order.utils";
import { UserRole } from "../user/user.constant";






const createOrder = async (
  user: IUser,
  payload: { products: { product: string; quantity: number }[] },
  client_ip:string
) => {
  if (!payload?.products?.length) {
    throw new AppError(httpStatus.NOT_ACCEPTABLE, "Order is not specified");
  }

  const products = payload.products;
  let totalPrice = 0;

  const productDetails = await Promise.all(
    products.map(async (item) => {
      const product = await Product.findById(item.product);
      if (!product) {
        throw new AppError(httpStatus.NOT_FOUND, "Product not found");
      }

      if ((product.stock || 0) < item.quantity) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          `Insufficient stock for ${product.name}`
        );
      }

      const subtotal = (product.price || 0) * item.quantity;
      totalPrice += subtotal;

      return { ...item, price: product.price }; 
    })
  );


  for (const item of productDetails) {
    await Product.findByIdAndUpdate(item.product, {
      $inc: { stock: -item.quantity },
    });
  }

  let order = await Order.create(
    {
      user: user._id,
      products: productDetails,
      totalPrice,
      status: OrderStatus.Pending,
    },
  );
    // payment integration
    const shurjopayPayload = {
      amount: totalPrice,
      order_id: order._id,
      currency: "BDT",
      customer_name: user.name,
      customer_address: user.address,
      customer_email: user.email,
      customer_phone: user.phone,
      customer_city: user.city,
      client_ip,

    }
    const payment = await orderUtils.makePaymentAsync(shurjopayPayload);
      if (payment?.transactionStatus) {
    order = await order.updateOne({
      transaction: {
        id: payment.sp_order_id,
        transactionStatus: payment.transactionStatus,
      },
    });
  }

  return payment.checkout_url;
};



const getOrders = async (user: IUser) => {
  const query = user.role === UserRole.admin ? {} : { user: user._id };

  const orders = await Order.find(query)
    .populate("user")
    .populate("products.product");

  return orders;
};



const updateOrder = async (orderId: string, updateData: IOrder) => {
  const order = await Order.findByIdAndUpdate(orderId, updateData, { new: true });
  return order;
};


const deleteOrder = async (orderId: string) => {
  await Order.findByIdAndDelete(orderId);
};
const verifyPayment = async (order_id: string) => {
  const verifiedPayment = await orderUtils.verifyPaymentAsync(order_id);
  if (verifiedPayment.length) {
    await Order.findOneAndUpdate(
      {
        "transaction.id": order_id,
      },
      {
        "transaction.bank_status": verifiedPayment[0].bank_status,
        "transaction.sp_code": verifiedPayment[0].sp_code,
        "transaction.sp_message": verifiedPayment[0].sp_message,
        "transaction.transactionStatus": verifiedPayment[0].transaction_status,
        "transaction.method": verifiedPayment[0].method,
        "transaction.date_time": verifiedPayment[0].date_time,
        status:
          verifiedPayment[0].bank_status == "Success"
            ? "Paid"
            : verifiedPayment[0].bank_status == "Failed"
            ? "Pending"
            : verifiedPayment[0].bank_status == "Cancel"
            ? "Cancelled"
            : "",
      }
    );
  }
  return verifiedPayment;
};

export const orderService = {
  createOrder,
  getOrders,
  updateOrder,
  deleteOrder,
  verifyPayment
};

