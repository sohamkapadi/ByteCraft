import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { User } from "../models/userSchema.js";
import { sendToken } from "../utils/jwtToken.js";

export const register=catchAsyncError(async(req,res,next)=>{
    const {name,email,phone,password}=req.body;

    if(!name || !email || !phone || !password){
        return next(new ErrorHandler('Please fill in all fields',400))
    }

    const isEmail=await User.findOne({email});

    if(isEmail){
        return next(new ErrorHandler('Email already in use',400))
    }

    const user=await User.create({
        name:name,
        email:email,
        phone:phone,
        password:password,
    });

    sendToken(user,200,res,"User Registered Successfully!");
});

export const login=catchAsyncError(async(req,res,next)=>{
    const {email,password}=req.body;

    if(!email || !password){
        return next(new ErrorHandler("Please fill in all details.",400));
    }

    const user=await User.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHandler("Invalid Email or Password",400));
    }

    const isPasswordMatched=await user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid Email or Password",400));
    }

    sendToken(user,200,res,"User logged in successfully!");
});

export const logout=catchAsyncError(async(req,res,next)=>{
    res.status(201).cookie("token","",{
        httpOnly:true,
        expires:new Date(Date.now()),
    }).json({
        success:true,
        message:"User logged out successfully!",
    });
});

export const getUser=catchAsyncError((req,res,next)=>{
    const user=req.user;
    res.status(200).json({
        success:true,
        user,
    });
});