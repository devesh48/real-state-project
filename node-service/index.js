import express from 'express'
import mongoose from 'mongoose';
import { configDotenv } from 'dotenv';
import UserRouter from './routes/user.route.js'

configDotenv();
mongoose.connect(process.env.Mongo).then(()=>{
    console.log('Connected to the Database.!!!!')
});
const app = express();

// app.get('/healthcheck', (req, res) => {
//     res.json('HealthCheck success!!!');
// })

app.use('/api/user', UserRouter);

app.listen(3000, () => {
    console.log('server is running on port 3000!!!');
});