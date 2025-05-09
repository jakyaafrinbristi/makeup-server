import { Router } from 'express';
import userRouter from '../modules/user/user.router';
import productRouter from '../modules/product/product.router';
import orderRouter from '../modules/order/order.router';



const router = Router();

const moduleRoutes = [
  {
    path: '/user',
    route: userRouter,
  },
  {
    path: '/product',
    route:productRouter,
  },
  {
    path: '/order',
    route: orderRouter,
  },
//   {
//     path: '/testimonial',
//     route: testimonialRouter ,
//   },
//   {
//     path: '/newsletter',
//     route: newsletterRouter ,
//   },
//   {
//     path: '/blog',
//     route: blogRouter ,
//   },


];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
