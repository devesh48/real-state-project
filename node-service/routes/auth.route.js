import express from 'express';
import { signup } from '../controllers/auth.contorller.js';

const router = express.Router();

router.post('/signup', signup);

export default router;