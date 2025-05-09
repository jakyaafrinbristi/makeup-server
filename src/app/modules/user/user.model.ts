import mongoose, { Schema, } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import TUserModel, { IUser, IUserMethods } from "./user.interface";
import config from "../../config";
import { UserRole } from "./user.constant";


const UserSchema = new Schema<IUser, TUserModel, IUserMethods>(
  {
    name: { type: String, required: true, trim: true },
    image: { type: String,  trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      immutable: true,
      trim: true,
    },
    password: { type: String, required: true, select: false },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.customer,
    },
    phone: { type: String, default: "N/A" },
    address: { type: String, default: "N/A" },
    city: { type: String, default: "N/A" },
  },
  {
    timestamps: true,
  }
);


UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});


UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {

  return bcrypt.compare(candidatePassword, this.password);
};


UserSchema.methods.generateToken = function (): string {
  return jwt.sign(
    { email: this.email, role: this.role ,name:this.name,address:this.address,image:this.image},
    config.jwt.access_secret!,
    {
      expiresIn: config.jwt.access_expires_in!,
    } as jwt.SignOptions
  );
};

UserSchema.methods.generateRefreshToken = function (): string {
  return jwt.sign(
    {  email: this.email, role: this.role ,name:this.name,address:this.address,image:this.image},
    config.jwt.refresh_secret!,
    {
      expiresIn: config.jwt.refresh_expires_in!,
    } as jwt.SignOptions
  );
}


const User = mongoose.model<IUser, TUserModel>("User", UserSchema);

export default User;
