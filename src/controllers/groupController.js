import asyncHandler from "express-async-handler";

import Groups from "../models/groupModel.js";

export const getGroups = asyncHandler(async(req, res) => {
    try {
        
    } catch (error) {
        throw new Error(error.message);
    }
});

export const getGroupById = asyncHandler(async(req , res) => {
    try {
        
    } catch (error) {
        throw new Error(error.message);
    }
});

export const createGroup = asyncHandler(async(req, res) => {
    try {
        const {...data} = req.body
        const group = await Groups.create({
            name: data.name,
            status: data.status
        })

        if(group){
            res.status(201).json({
                message: "create group successfully",
                data: group
            })
        }
    } catch (error) {
        throw new Error(error.message);
    }
});

export const updateGroup = asyncHandler(async(req, res) => {
    try {
        
    } catch (error) {
        throw new Error(error.message);
    }
});


export const deleteGroup = asyncHandler(async(req, res) => {
    try {
        
    } catch (error) {
        throw new Error(error.message);
    }
});