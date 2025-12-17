import User from "../models/user.model.js";
import Listing from '../models/listing.model.js';
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


export const deleteUser = async(req, res, next) => {
    if(req.user.id == req.params.id) return next(errorHandler(401, 'You can only delete your own account'))
        try {
            await User.findByIdAndDelete(req.params.id)
            res.clearCookie('access_token')
            res.status(200).json({message:"User has been deleted..."})
        } catch (error) {
            next(error)
        }
}

export const getUserListings = async(req, res, next) => {
    if (req.user.id === req.params.id){
        try {
            const listings = await Listing.find({userRef: req.params.id})
            res.status(200).json(listings)
        } catch (error) {
            next(error)
        }
    }else{
        return next(errorHandler(401, 'You can only view your own listings!'))
    }
}

export default test;