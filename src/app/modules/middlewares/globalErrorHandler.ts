/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import config from "../../config";




const globalErrorHandler: ErrorRequestHandler = (err :any, req :Request, res:Response, next :NextFunction) => {

  const message = err.message || "Something Went Wrong";

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message,
    error: err?.errors || err,
    stack: config.NODE_ENV === "development" ? err?.stack : null,
  });
};

export default globalErrorHandler;