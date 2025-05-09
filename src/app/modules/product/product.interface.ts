import { Document } from "mongoose";

export interface IProduct extends Document {

  name: string;
  brand: string;
  price: number;
  description: string;
  category:'Face' | 'Eyes' | 'Lips' | 'Skin' | 'Hair' | 'Nails' | 'Fragrance' | 'Tools';
  stock: number;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
};
