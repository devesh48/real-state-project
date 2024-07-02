import express from 'express'
import mongoose from 'mongoose';
import { configDotenv } from 'dotenv';
import UserRouter from './routes/user.route.js'
import AuthRouter from './routes/auth.route.js'

configDotenv();
mongoose.connect(process.env.Mongo).then(()=>{
    console.log('Connected to the Database.!!!!')
});
const app = express();

app.use(express.json());

app.use('/api/user', UserRouter);
app.use('/api/auth', AuthRouter);

app.listen(3000, () => {
    console.log('server is running on port 3000!!!');
});


//middler ware used to handle error generally.
app.use((err, req, res, next) => {
    const statusCode = res.statusCode || 500;
    const message = err.message || 'Internal Server Error!!.'
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
});