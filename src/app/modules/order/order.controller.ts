
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

import { orderService } from "./order.service";
import httpStatus from "http-status";

const createOrder = catchAsync(async (req, res) => {
  const user = req.user;  

 
  const order = await orderService.createOrder(user, req.body,req.ip!);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Order placed successfully',
    data: order,
  });
});

const getOrders = catchAsync(async (req, res) => {
  const user = req.user;

  const orders = await orderService.getOrders(user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Orders retrieved successfully",
    data: orders,
  });
});



const updateOrder = catchAsync(async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  
  const updatedOrder = await orderService.updateOrder(id, updateData);
  
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order updated successfully",
    data: updatedOrder,
  });
});
const deleteOrder = catchAsync(async (req, res) => {
  const { id } = req.params;  


  const result = await orderService.deleteOrder(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order deleted successfully",
    data: result,
  });
});
const verifyPayment = catchAsync(async (req, res) => {
  const order = await orderService.verifyPayment(req.query.order_id as string);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Order verified successfully",
    data: order,
  });
});

export const orderController = { 
  createOrder,  
  getOrders,
  updateOrder,
  deleteOrder ,
  verifyPayment
};
