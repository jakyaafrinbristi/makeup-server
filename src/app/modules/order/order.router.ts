import { Router } from "express";
import { orderController } from "./order.controller";
import { UserRole } from "../user/user.constant";
import auth from "../middlewares/auth";



const orderRouter = Router();
orderRouter.get("/verify", auth(UserRole.customer,UserRole.admin), orderController.verifyPayment);

orderRouter

  .route("/")
  .post(auth(UserRole.customer,UserRole.admin), orderController.createOrder)
  .get(auth(UserRole.customer,UserRole.admin), orderController.getOrders);
  orderRouter
  .route("/:id")
  .patch(auth(UserRole.admin), orderController.updateOrder)
  .delete(auth(UserRole.admin), orderController.deleteOrder);


export default orderRouter;