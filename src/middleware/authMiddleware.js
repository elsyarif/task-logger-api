import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import Users from '../models/userModel.js'

export const protect = asyncHandler(async(req, res, next) =>{
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            token = req.headers.authorization.split(' ')[1]

            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            const user = await Users.findById(decoded.id).select('-password')
             
            req.user = {
                _id : user._id,
                name : user.name,
                username : user.username,
                groupId: user.groupId,
                status : user.status
            }
                        
            next()
        } catch (error) {
            res.status(401)
            throw new Error('Not authorized, token failed')
        }
    }

    if (!token) {
        res.status(401)
        throw new Error('Not authorized, no token')
      }
})

 export const admin = asyncHandler(async (req, res, next) => {
    const user = req.user

    if(user.roles.name === 'Admin'){
        next()
    }else{
        res.status(401)
        throw new Error('Not authorized as an admin')
    }
 })

 export const permit = asyncHandler(async(req, res, next) => {
    const user = req.user
    let role_permission = []
    let roles = []
    let permission = []
    let role = await Roles.find()
    let permissions = await PermissionModel.find()

    // inisialisasi objek to array role_permission 
    for (let i = 0; i < role.length; i++) {
        let permit = []
        for (let j = 0; j < role[i].permissions.length; j++) {
            permit.push(role[i].permissions[j].name)
        }
        role_permission.push({
            _id: role[i]._id,
            name: role[i].name,
            permission: permit
        })
    }
    // inisialisasi objek to array roles master data 
    for (let i = 0; i < role.length; i++) {
        roles.push(role[i].name)
    }

    // inisialisasi objek to array permission master data 
    for (let i = 0; i < permissions.length; i++) {
        permission.push({
            name : permissions[i].name,
            method : permissions[i].method
        })
    }
    
    if(roles.includes(user.roles.name)){
        for (let i = 0; i < user.roles.permissions.length; i++) {
            const get = await PermissionModel.findOne({
                name: user.roles.permissions[i]
            })

            if(!get){
                res.status(403)
                throw new Error("You don't have permission")
            }
            if(req.method === get.method){
                if(user.roles.permissions[i] === get.name){
                    next()
                    return
                }
            }
        }
    }else{
        res.status(403)
        throw new Error("You don't have role")
    }
 })
