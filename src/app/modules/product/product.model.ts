import mongoose, { Schema } from "mongoose";
import { IProduct } from "./product.interface";

const ProductSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    brand: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
      trim: true,
    },
    category: {
      type: String,
      enum:['Face' , 'Eyes' , 'Lips' , 'Skin' , 'Hair' , 'Nails' , 'Fragrance' , 'Tools'],
      trim: true,
      },

    
    description: {
      type: String,
      required: true,
      trim: true,
    },
   
    stock: {
      type: Number,
      required: true,
      default: 0,
    },
    imageUrl: { type: String },
    
  },
  { timestamps: true },
);

const Product = mongoose.model<IProduct>("Product", ProductSchema);

export default Product;
