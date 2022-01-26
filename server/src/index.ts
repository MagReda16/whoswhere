import * as dotenv from 'dotenv';
dotenv.config();
import express, { Application } from 'express';
import cors from 'cors';
import router from './router';

const app: Application = express();

const PORT: number = parseInt(process.env.PORT);
const corsConfig = {
  credentials: true,
  origin: process.env.CORS_ORIGIN,
};

app.use(cors(corsConfig));
app.use(express.json());
app.use(router);

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT} !! `);
});
