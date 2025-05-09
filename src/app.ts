import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser";

import globalErrorHandler from './app/modules/middlewares/globalErrorHandler';
import notFound from './app/modules/middlewares/notFound';
import router from './app/router';
const app: Application = express();


//parser
app.use(express.json());
app.use(cookieParser());
// app.use(cors({ origin: ["http://localhost:5173" ,"http://localhost:5174"
app.use(cors({ origin: ["http://localhost:5173" ,"http://localhost:5174","https://bicycle-store-frontend-project.vercel.app"], credentials: true }));


//application routes
// app.use('/api/products', BicycleRoutes);
// app.use('/api/orders', OrderRoutes);
app.use('/api/', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Bicycle store!');
});
app.use(globalErrorHandler);
app.use(notFound);

export default app;
