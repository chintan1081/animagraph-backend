import express from 'express';
import cors from 'cors';
import animationRoutes from './routes/animation.routes.js';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const app = express();
import path from 'path';
const __dirname = path.dirname(__filename);
import dotenv from 'dotenv'
import  AppDataSource  from './database/ormconfig.js';

dotenv.config();
app.use(cors());
app.use(express.json());
AppDataSource.initialize().then(() => {
  console.log("Connected to NeonDB");
})
app.use('/animation', animationRoutes);
app.use('/videos', express.static(path.join(__dirname, '../media/videos')));


export default app;