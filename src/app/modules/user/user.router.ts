import { Router } from "express";
import { UserController } from "./user.controller";
import auth from "../middlewares/auth";


const userRouter = Router();

userRouter.post("/register", UserController.registerUser);
userRouter.post("/login", UserController.loginUser);
userRouter.patch("/update/:userId", UserController.updateToAdmin);
userRouter.get("/", UserController.getAllUsers);
userRouter.post("/refresh-token", UserController.refreshToken);
userRouter.patch("/profile", auth("customer", "admin"), UserController.updateProfile);
userRouter.patch("/change-password", auth("customer", "admin"), UserController.changePassword);


export default userRouter;