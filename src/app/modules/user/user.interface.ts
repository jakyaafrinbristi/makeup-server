/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable no-unused-vars */
import { Document, Model } from "mongoose";
import { UserRole } from "./user.constant";


export interface IUser extends Document {
  name: string;
  image:string;
  email: string;
  password: string;
  role: UserRole;
  phone?: string;
  address?: string;
  city?: string;
  createdAt: Date;
  updatedAt: Date;
}


export interface IUserMethods {
  comparePassword(candidatePassword: string): Promise<boolean>;
  generateToken(): string;
  generateRefreshToken(): string
}


type TUserModel = Model<IUser, {}, IUserMethods>;

export default TUserModel;
