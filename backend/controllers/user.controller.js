import User from "../models/user.model.js";
import errorHandler from "../utils/error.js"
import bcryptjs from "bcryptjs";


const test = (req, res) => {
    console.log('hello world')
    res.json({
        message:'Hello World'
    })
}

export const updatedUser = async(req, res, next) => {
    const id = req.params.id
    console.log("udpateUser", id)
    console.log('user id end',req.body.password)
    if(req.user.id != req.params.id) return next(errorHandler(401, 'You can only update your own account!'))
        
        try {
            if(req.body.password){
                req.body.password = bcryptjs.hashSync(req.body.password, 10)
            }
            console.log('user id end',req.body.password)
            console.log("ima from update user")
            const updatedUser = await User.findByIdAndUpdate(req.params.id,{
                $set:{
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    avatar: req.body.avatar,
                }
            }, {new:true});
            console.log("ima from update user", updatedUser)
            const { password, ...rest} = updatedUser._doc
            console.log("ima from profile ", rest);
            res.status(200).json(rest);
        } catch (error) {
            next(error)
        }
}
export default test;