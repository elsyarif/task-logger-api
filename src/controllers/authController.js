import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import Users from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

export const signup = asyncHandler(async(req, res) => {
    try {
        
    } catch (error) {
        console.log(error)
    }
}) 

export const signin = asyncHandler(async(req, res) =>{
    try {
        
    } catch (error) {
        
    }
})

export const refreshToken = asyncHandler(async(req, res) => {})