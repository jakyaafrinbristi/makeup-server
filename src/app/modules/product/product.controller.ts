import { Request, Response } from "express";
import httpStatus from "http-status";
import { productService } from "./product.service";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

export const createProduct = catchAsync(async (req: Request, res: Response) => {
  const productData = req.body;
  const newProduct = await productService.createProduct(productData);
  sendResponse(res,{
    statusCode:httpStatus.OK,
    success:true,
    message:'Product created successfully',
    data:newProduct,
  });
});

export const getAllProducts = catchAsync(
  async (req: Request, res: Response) => {
    const query = req.query;
    const result = await productService.getProducts(query);
    sendResponse(res,{
      statusCode:httpStatus.OK,
      success:true,
      message:'Product retrieved successfully',
      meta:result.meta,
      data:result.result,
    });
  }
);

export const getProductById = catchAsync(
  async (req: Request, res: Response) => {
    const productId = req.params.id;
    const product = await productService.getProductById(productId);
    sendResponse(res,{
      statusCode:httpStatus.OK,
      success:true,
      message:'Product retrieved successfully',
      data:product,
    });
  }
);

export const updateProduct = catchAsync(async (req: Request, res: Response) => {
  const productId = req.params.id;
  const updateProducts = req.body;
  const updateData= await productService.updateProductsById(productId,updateProducts);
  sendResponse(res,{
    statusCode:httpStatus.OK,
    success:true,
    message:'Product updated successfully',
    data:updateData,
  });
});
export const deleteProduct = catchAsync(async (req: Request, res: Response) => {
  const productId = req.params.id;
  const deleted = await productService.deleteProductById(productId);
  sendResponse(res,{
    statusCode:httpStatus.OK,
    success:true,
    message:'Product retrieved successfully',
    data:deleted,
  });
});

export const productController = {
  createProduct,
  getAllProducts,
  getProductById,
  deleteProduct,
  updateProduct
};
