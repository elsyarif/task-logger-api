import asyncHandler from "express-async-handler";

import Todos from "../models/todoModel.js";

export const getTodos = asyncHandler(async (req, res) => {
  try {
    const groupId = req.user.groupId;

    const currentPage = Number(req.query.page) || 1;
    const perPage = Number(req.query.limit) || 5;
    let totalItems;

    const count = await Todos.countDocuments();
    totalItems = count;

    const todos = await Todos.find({
      groupId: groupId,
    })
      .skip((currentPage - 1) * perPage)
      .limit(perPage);

    // add columen edited for user Group can Edit
    for (let i = 0; i < todos.length; i++) {
      todos[i].test = todos.groupId === groupId ? true : false;
    }

    if (todos) {
      res.json({
        message: "Find all todos successfully",
        data: todos,
        total_data: totalItems,
        per_page: perPage,
        current_page: currentPage,
      });
    }
  } catch (error) {
    throw new Error(error.message);
  }
});

export const getTodosById = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
  } catch (error) {
    throw new Error(error.message);
  }
});

export const createTodo = asyncHandler(async (req, res) => {
  try {
    const { ...data } = req.body;

    const todo = await Todos.create({
      title: data.title,
      description: data.description,
      status: false,
      groupId: req.user.groupId,
    });

    if (todo) {
      res.json({
        message: "create Todos Succesfully",
        data: todo,
      });
    }
  } catch (error) {
    throw new Error(error.message);
  }
});

export const updateTodo = asyncHandler(async (req, res) => {
  try {
  } catch (error) {
    throw new Error(error.message);
  }
});

export const updateStatusTodo = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;

    const todo = await Todos.findById(id);

    if (todo) {
      throw new Error("Todo not found");
    }
    // set status for done todo set
    todo.status = true;
    const update = await todo.save();

    res.json({
      message: "",
      data: update,
    });
  } catch (error) {
    throw new Error(error.message);
  }
});

export const deleteTodo = asyncHandler(async (req, res) => {
  try {
  } catch (error) {
    throw new Error(error.message);
  }
});
