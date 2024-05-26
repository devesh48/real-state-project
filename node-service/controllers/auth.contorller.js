import Estate from '../models/estate.model.js'
import bcryptjs from 'bcryptjs'

export const signup = async (req, res, next) => {
    try{
        const { username, email, password } = req.body;
    const encryptedPwd = await bcryptjs.hashSync(password, 10);
    const newUser = new Estate({username, email, password:encryptedPwd});
    await newUser.save();
    res.status(202).json('User Added Successfully!!!.')
    } catch(err){
        // res.status(500).josn(err);
        next(err);
    }

}