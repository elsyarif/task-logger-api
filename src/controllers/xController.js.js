import asyncHandler from "express-async-handler";
import bcrypt from 'bcryptjs'
import Users from "../../models/userModel.js";
import { unlinkFile } from "../../utils/unlnkFile.js";
import Roles from "../../models/roleModel.js";
import generateToken from "../../utils/generateToken.js";
import { join } from 'path'
 
export const createUsers = asyncHandler(async (req, res, next) => {
  const path = req.file.path;
  try {
    const { name, username, email, password, status, roles } = req.body;
    const avatar = req.file.filename;
    const salt = await bcrypt.genSalt(10)

    const userExist = await Users.findOne({email});
    if (userExist) {
      res.status(400);
      throw new Error("Email already Exist");
    }

    const users = await Users.create({
        name,
        username,
        email,
        password : bcrypt.hashSync(password, salt),
        avatar,
        status,
        roles
    });
   
    if(users){
        res.status(201).json({
          message: "Create users seccessfully",
          data: {
              _id: users._id,	
              name:users.name,
              username: users.username,
              email: users.email,
              avatar: users.avatar,
              roles: await Roles.findById(users.roles),
              token : generateToken(users._id)
          },
        });
    }else{
        unlinkFile(path);
        res.status(400)
        throw new Error('Invalid user data')
    }
  } catch (error) {
    unlinkFile(path);
    throw new Error(error.message);
  }
});

export const authUser = asyncHandler(async(req, res, next) =>{
    try {
        const { email, password} = req.body

        const user = await Users.findOne({email})
        const getRole = await Roles.findById({_id :user.roles})
        let permission = []

        for (let i = 0; i < getRole.permissions.length; i++) {
            permission.push(getRole.permissions[i].name)
        }

        if(!user.status){
            res.status(401)
            throw new Error('User not activated')
        }

        if(!user){
            res.status(401)
            throw new Error('Invalid email')
        }
        const verifyPass = bcrypt.compareSync(password, user.password)

        if(user && verifyPass){
            res.json({
                _id: user._id,
                name:user.name,
                username: user.username,
                email: user.email,
                avatar: user.avatar,
                roles: {
                    _id: getRole._id,
                    name: getRole.name,
                    permission: permission
                },
                token : generateToken(user._id)
            })
        }else{
            res.status(401)
            throw new Error('Invalid password')
        }
    } catch (error) {
        throw new Error(error.message);
    }
})

export const getAvatar = asyncHandler(async(req, res, next) => {
    const avatar = req.params.avatar

    res.sendFile(join(process.cwd(), `public/images/users/${avatar}`))
})

export const getProfile = asyncHandler(async(req, res, next) =>{
    try {
        const id = req.user._id
        
        const user = await Users.findById(id).select('-password')
    
        if(user){
            res.status(200).json({
                message : "Get User profile successfully",
                data : user
            })
        }else{
            throw new Error('User not found');
        }
    } catch (error) {
        throw new Error(error.message);
    }
})

export const changePassword = asyncHandler(async(req, res, next) => {
    try {
        const id = req.user._id
        const {oldPassword, newPassword, confirm} = req.body
        const salt = await bcrypt.genSalt(10)
        const user = await Users.findById(id).select('password')

        if(newPassword !== confirm){
            res.status(400)
            throw new Error("New password not match")
        }
        const verify = bcrypt.compareSync(oldPassword, user.password)
        
        if(verify){
            user.password = bcrypt.hashSync(newPassword, salt)

            const update = await user.save()
            res.json({
                message : "Change password successfully",
                data: update
            })
        }else{
            res.status(400)
            throw new Error("Wrong Password")
        }
    } catch (error) {
        throw new Error(error.message);
    }
})

export const updateUser = asyncHandler(async(req, res, next) =>{
    try {
        const id = req.params.id
        const { name, username, email } = req.body
        let avatar
        if(req.file !== undefined){
            avatar = req.file.filename;
        }
        const user = await Users.findById(id)

        if(avatar){
            const path = `public/images/users/${user.avatar}`
            unlinkFile(path)
        }

        if(user){
            user.name = name || user.name
            user.username = username || user.username
            user.email = email || user.email
            user.avatar = avatar || user.avatar

            const update = await user.save()

            res.json({
                message : `Update user ${user.name} successfully`,
                data: update
            })
        }else{
            res.status(400)
            throw new Error("Invalid user data")
        }
    } catch (error) {
        throw new Error(error.message);
    }
})

export const changeStatus = asyncHandler(async(req, res, next) =>{
    try {
        const id = req.params.id
        const {status} = req.body
        const user = await Users.findById(id)

        if(user){
            user.status = status 

            const update = await user.save()
            res.json({
                message : `User status updated successfully`,
                data: update
            })
        }else{
            res.status(400)
            throw new Error("Invalid user not found")
        }
    } catch (error) {
        throw new Error(error.message);
    }
})