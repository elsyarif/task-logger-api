import asyncHandler from "express-async-handler";
import bcrypt from 'bcryptjs'

import Users from "../models/userModel.js";
import generateToken from "../../utils/generateToken.js";

export const userRegister = asyncHandler(async(req, res) => {
    try {
		const salt = await bcrypt.genSalt(10)
        const {...data} = req.body
		
		const userExist = await Users.findOne({data.username});
		if (userExist) {
		  res.status(400);
		  throw new Error("Username already Exist");
		}
		const users = await Users.create({
			name : data.name,
			username: data.username,
			email: data.email,
			password: bcrypt.hashSync(data.password, salt),
			status: true,
			groupId: data.groupId
		})
		
		if(users){
			res.status(201).json({
				message: "Register User Successfully",
				data: {
					_id: users._id,
					name: users.name,
					username: users.username,
					email: users.email,
					groupId: users.groupId,
					token: generateToken(users._id)
				}
			})
		}
    } catch (error) {
        throw new Error(error.message);
    }
});

export const userAuth = asyncHandler(async(req, res) => {
    try {
        const { username, password} = req.body
		
		const user = await Users.findOne({username)
		if(!user){
			throw new Error("username not found")
		}
		
		if(!user.status){
			throw new Error("username status invalid")
		}
			
		const verifyPass = bcrypt.compareSync(password, user.password)
		if(user && verifyPass){
			res.status(200).json({
				message: "Register User Successfully",
				data: {
					_id: user._id,
					name: user.name,
					username: user.username,
					email: user.email,
					groupId: user.groupId,
					token: generateToken(user._id)
				}
			})
		}else{
			throw new Error("Password invalid")
		}
    } catch (error) {
        throw new Error(error.message);
    }
});

export const userEdit = asyncHandler(async(req, res) => {
    try {
        
    } catch (error) {
        throw new Error(error.message);
    }
});
