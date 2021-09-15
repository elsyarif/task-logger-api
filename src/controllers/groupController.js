import asyncHandler from "express-async-handler";

import Groups from "../models/groupModel.js";

export const getGroups = asyncHandler(async (req, res) => {
  try {
    const currentPage = Number(req.query.page) || 1;
    const perPage = Number(req.query.page) || 5;
    let totalItems;
    const count = await Groups.countDocuments();
    totalItems = count;
    const group = await Groups.find()
      .skip((currentPage - 1) * perPage)
      .limit(perPage);

    if (group) {
      res.json({
        message: "Find all groups successfully",
        data: group,
        total_data: totalItems,
        per_page: perPage,
        current_page: currentPage,
      });
    }
  } catch (error) {
    throw new Error(error.message);
  }
});

export const getGroupById = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const group = await Groups.findById(id);

    if (group) {
      res.status(200).json({
        message: "Find group successfully",
        data: group,
      });
    }
  } catch (error) {
    throw new Error(error.message);
  }
});

export const createGroup = asyncHandler(async (req, res) => {
  try {
    const { ...data } = req.body;
    const group = await Groups.create({
      name: data.name,
      status: data.status,
    });

    if (group) {
      res.status(201).json({
        message: "create group successfully",
        data: group,
      });
    }
  } catch (error) {
    throw new Error(error.message);
  }
});

export const updateGroup = asyncHandler(async (req, res) => {
  try {
  } catch (error) {
    throw new Error(error.message);
  }
});

export const deleteGroup = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const group = await Groups.findOne({ _id: id });

    if (!group) {
      throw new Error("group not found");
    }
  } catch (error) {
    throw new Error(error.message);
  }
});
