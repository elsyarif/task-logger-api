import asyncHandler from "express-async-handler";

import Groups from "../models/groupModel.js";

export const getAllGroup = async (currentPage, perPage ) => {
  try {
    let totalItems;
	
    const count = await Groups.countDocuments();
    totalItems = count;
	
    const group = await Groups.find()
      .skip((currentPage - 1) * perPage)
      .limit(perPage);
	
	return group
	
  } catch (error) {
    throw new Error(error.message);
  }
};
