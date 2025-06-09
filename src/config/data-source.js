import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './entities/User';
import dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.NEON_DB_URL,
  entities: [User],
  synchronize: true, // set false in production
  ssl: true, // Neon requires SSL
});