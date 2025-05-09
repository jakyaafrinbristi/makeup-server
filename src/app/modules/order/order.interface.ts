/* eslint-disable no-unused-vars */




import { Document, Types } from "mongoose";

export enum OrderStatus {
  Pending = "Pending",
  Paid = "Paid",
  Shipped = "Shipped",
  Completed = "Completed",
  Cancelled = "Cancelled",
}
export interface IOrder extends Document {
  user: Types.ObjectId;
  products: {
    product: Types.ObjectId;
    quantity: number;
  }[];
  totalPrice: number;
  status:  OrderStatus;
  transaction: {
    id: string;
    transactionStatus: string;
    bank_status: string;
    sp_code: string;
    sp_message: string;
    method: string;
    date_time: string;
  };

};
