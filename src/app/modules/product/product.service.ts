
import QueryBuilder from "../../builder/QueryBuilder";
import { IProduct } from "./product.interface";
import Product from "./product.model";

async function createProduct(payload: IProduct) {
  const product =await Product.create(payload);
  return product;
}

async function getProducts(query:Record<string,unknown>) {
  const productQuery = new QueryBuilder(Product.find(),query)
  .search(["name","brand","category"])
  .filter()
  .sort()
  .paginate()
  .fields()
const result = await productQuery.modelQuery;
const meta = await productQuery.countTotal();
return {meta,result}
}

async function getProductById(id: string) {
  const product = await Product.findById(id);
  return product;
}

async function deleteProductById(id: string) {
  const product = await Product.findByIdAndDelete(id);
  return product;
}

async function updateProductsById(id:string, payload:IProduct){
  const updateProduct=await Product.findByIdAndUpdate(id,payload,{
    new:true,
    runValidators:true});
    
    
  return updateProduct;
}

export const productService = {
  createProduct,
  getProducts,
  getProductById,
  deleteProductById,
  updateProductsById
};
