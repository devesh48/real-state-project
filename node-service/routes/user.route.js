import express from 'express';
import { healthcheck, updateUser } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js'


const router =  express.Router();

router.get('/healthcheck', healthcheck);
router.post('/update/:id', verifyToken, updateUser);


export default router;