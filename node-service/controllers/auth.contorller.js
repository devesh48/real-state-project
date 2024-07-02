import Estate from '../models/estate.model.js'
import bcryptjs from 'bcryptjs'
import { errorHandler } from '../utils/error.js'
import jwt from 'jsonwebtoken'

export const signup = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const encryptedPwd = await bcryptjs.hashSync(password, 10);
        const newUser = new Estate({ username, email, password: encryptedPwd });
        await newUser.save();
        res.status(202).json('User Added Successfully!!!.')
    } catch (err) {
        // res.status(500).josn(err);
        next(err);
    }
}

export const signin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        console.log(email,password)
        const validUser = await Estate.findOne({email});
        if (!validUser) {
            return next(errorHandler(404, 'user not found!!!!'))
        };
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) {
            return next(errorHandler(401, 'user not Authorized!!!'))
        }
        const token = jwt.sign({ id: validUser._id}, process.env.JWT_SECRET)
        const {password: pass, ...rest } = validUser._doc;
        res.cookie('access_token', token, {httpOnly: true}).status(200).json(rest);
    } catch (err) {
        // res.status(500).josn(err);
        next(err);
    }
}