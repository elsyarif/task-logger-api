import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import Users from '../models/userModel.js'
import Roles from '../models/roleModel.js'
import PermissionModel from '../models/permissionModel.js'

export const protect = asyncHandler(async(req, res, next) =>{
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            token = req.headers.authorization.split(' ')[1]

            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            const user = await Users.findById(decoded.id).select('-password')
            const getRole = await Roles.findById({_id :user.roles})
            let permission = []

            for (let i = 0; i < getRole.permissions.length; i++) {
                permission.push(getRole.permissions[i].name)
            }
             
            req.user = {
                _id : user._id,
                name : user.name,
                username : user.username,
                avatar: user.avatar,
                roles : {
                    _id : getRole._id,
                    name : getRole.name,
                    permissions : permission
                },
                status : user.status
            }
            
            req.outlet = {
                _id : user.outlet
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

//  export const permit_old = asyncHandler(async(req, res, next) => {
//     const permission = req.user.roles.permissions

//     for (let i = 0; i < permission.length; i++) {
//         switch (req.method) {
//             case 'POST':
//                 if(permission[i].name.toUpperCase() === 'CREATE'){
//                     next()
//                     return
//                 }
//                 break;
//             case 'PUT':
//             case 'PATCH':
//                 if(permission[i].name.toUpperCase() === 'UPDATE'){
//                     next()
//                     return
//                 }
//                 break;
//             case 'DELETE':
//                 if(permission[i].name.toUpperCase() === 'DELETE'){
//                     next()
//                     return
//                 }
//                 break;
//             case 'GET':
//                 next()
//                 return;
//         }
//     }
//     res.status(403)
//     throw new Error("You don't have permission")
//  })