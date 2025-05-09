import { Router } from "express";
import { productController } from "./product.controller";

const productRouter = Router();

productRouter
  .route("/:id")
  .get(productController.getProductById)
  .delete(productController.deleteProduct)
  .put(productController.updateProduct)
productRouter
  .route("/")
  .get(productController.getAllProducts)
  .post(productController.createProduct);

export default productRouter;
