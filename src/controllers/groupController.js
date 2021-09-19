import asyncHandler from "express-async-handler";

import Groups from "../models/groupModel.js";
import { getAllGroup } from "../services/groupServices.js";

export const getGroups = asyncHandler(async (req, res) => {
  try {
    const currentPage = Number(req.query.page) || 1;
    const perPage = Number(req.query.limit) || 5;
    let totalItems;

    const count = await Groups.countDocuments({
      status: true,
    });
    totalItems = count;
    const group = await getAllGroup(currentPage, perPage);

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

    if (!group) {
      throw new Error("group not found");
    }
    res.status(200).json({
      message: "Find group successfully",
      data: group,
    });
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
    const id = req.params.id;
    const { ...data } = req.body;

    const group = await Groups.findById(id);

    if (!group) {
      throw new Error("group not found");
    }

    group.name = name || data.name;
    group.description = description || data.description;

    const update = await group.save();

    res.json({
      message: "update group successfully",
      data: update,
    });
  } catch (error) {
    throw new Error(error.message);
  }
});

export const updateStatusGroup = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const { ...data } = req.body;

    const group = await Groups.findById(id);

    if (!group) {
      throw new Error("group not found");
    }

    group.status = data.status;

    const update = await group.save();

    res.json({
      message: "update status group successfully",
      data: update,
    });
  } catch (error) {
    throw new Error(error.message);
  }
});

export const deleteGroup = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const group = await Groups.findById(id);

    if (!group) {
      throw new Error("group not found");
    } else {
      const remove = await Groups.deleteOne({ _id: id });

      res.json({
        message: "Groups delete successfully",
        data: remove,
      });
    }
  } catch (error) {
    throw new Error(error.message);
  }
});
