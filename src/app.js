import express from 'express';
import cors from 'cors';
import animationRoutes from './routes/animation.routes.js';
import http from 'http';
// import connectDB from './config/db.config';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const app = express();
import path from 'path';
const __dirname = path.dirname(__filename);

// connectDB();
import dotenv from 'dotenv'
dotenv.config();
app.use(cors());
app.use(express.json());
app.use('/animation', animationRoutes);
app.use('/videos', express.static(path.join(__dirname, '../media/videos')));


export default app;