import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserService } from "./user.service";
import httpStatus from "http-status";
import config from "../../config";
import AppError from "../../errors/AppError";

const registerUser = catchAsync(async (req: Request, res: Response) => {
  const data = await UserService.registerUser(req.body);
  sendResponse(res,{
    statusCode:httpStatus.CREATED,
    success:true,
    message:"Registered successfully",
    data,
  });
});

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { accessToken, refreshToken } = await UserService.loginUser(req.body);


  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: config.NODE_ENV === "production",
    sameSite: "strict",
  });

  sendResponse(res, {
    statusCode: httpStatus.ACCEPTED,
    success: true,
    message: "Logged in successfully",
    data: { accessToken },
  });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const token = req.cookies.refreshToken;

  if (!token) {
    throw new AppError(401, 'No refresh token found');
  }

  const accessToken = await UserService.refreshToken(token);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "New access token generated successfully",
    data: { accessToken },
  });
});


const updateToAdmin = catchAsync(async (req: Request, res: Response) => {
  const { userId} =req.params;
  const data = await UserService.updateUserToAdmin(userId);
  sendResponse(res,{
    statusCode:httpStatus.OK,
    success:true,
    message:"Admin Login Successfull",
    data,
  });
});
const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const data = await UserService.getAllUsers();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users fetched successfully",
    data,
  });
});
const updateProfile = catchAsync(async (req: Request, res: Response) => {
  const email = req.user.email; 
  const updatedUser = await UserService.updateUserProfile(email, req.body);  
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Profile updated successfully",
    data: updatedUser
  });
});
const changePassword = catchAsync(async (req: Request, res: Response) => {
  const email = req.user.email;  
  const { currentPassword, newPassword } = req.body;


 const changePasswordUser= await UserService.changeUserPassword(email, currentPassword, newPassword);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Password updated successfully",
    data:changePasswordUser
  });
});


export const UserController = {
  registerUser,
  loginUser,
  updateToAdmin ,
  getAllUsers,
  refreshToken,
  updateProfile,
  changePassword

};

