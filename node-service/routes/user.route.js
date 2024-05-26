import express from 'express';
import { healthcheck } from '../controllers/user.controller.js';


const router =  express.Router();

router.get('/healthcheck', healthcheck);


export default router;