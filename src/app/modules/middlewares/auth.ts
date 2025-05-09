import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import catchAsync from "../../utils/catchAsync";
import AppError from "../../errors/AppError";
import config from "../../config";
import User from "../user/user.model";


const auth = (...requiredRoles: string[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
   
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized!");
    }

   
    const decoded = jwt.verify(
      token,
      config.jwt.access_secret as string
    ) as JwtPayload;

    const { role, email  } = decoded;

   
    const user = await User.findOne({ email });


    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        "You are not authorized  hi!"
      );
    }

    req.user = user;
    next();
  });
};

export default auth;

