import { Request, Response } from 'express';
import express from 'express';
import AuthController from '../controllers/auth';

const authRoutes = express.Router();
const authController = new AuthController();

authRoutes.post('/login', authController.login);

export default authRoutes;
