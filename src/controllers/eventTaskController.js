import asyncHandler from "express-async-handler";

import EventTask from "../models/eventTask.js";

export const getEventTask = asyncHandler(async(req, res) => {
    try {
        const groupId = req.user.groupId;
		
		const currentPage = Number(req.query.page) || 1;
		const perPage = Number(req.query.limit) || 5;
		let totalItems;
		
		const count = await EventTask.countDocuments({
			groupId
		});
		totalItems = count;
		
		const eventTask = await EventTask.find({
		  groupId
		})
		  .skip((currentPage - 1) * perPage)
		  .limit(perPage);
	  
	  if(eventTask){
		  res.json({
			message: "Find all Event Task successfully",
			data: eventTask,
			total_data: totalItems,
			per_page: perPage,
			current_page: currentPage,
		  });
	  }
    } catch (error) {
        throw new Error(error.message);
    }
});

export const getEventTaskById = asyncHandler(async(req, res) => {
    try {
        const id = req.params.id;
		
		const event = await EventTask.findById(id)
		
		if(event){
			throw new Error("Event Task not Found");
		}
		
		res.json({
			message: "Event Task get Succesfully",
			data: event
		})
		
    } catch (error) {
        throw new Error(error.message);
    }
});

export const createEventTask = asyncHandler(async(req, res) => {
    try {
        const {...data} = req.body
		
		const event = await EventTask.create({
			title: data.title,
			description : data.description,
			status : false,
			groupId : req.user.groupId,
		})
		//get all data
		const allData = await EventTask.find()
		// emit to
		io.emit('eventTask-add', allData)
		// tampikan dan buat notofiksai ke group user
		
		if(event){
			res.json({
				message: "Create Event Succesfully",
				data: event,
			});
		}
    } catch (error) {
        throw new Error(error.message);
    }
});

/**
 * @id params
 * add events task in Task parent 
 */
export const addEventTask = asyncHandler(async(req, res) => {
    try {
        const id = req.params.id
		const {...data} = req.body
		
		const event = await EventTask.findById(id)
		
		event.tasks.push({
			title: data.title,
			status: false,
			sart_date: data.sart_date,
			end_date: data.end_date
		})
		
		const task = await event.save()
		
		//get all data
		const allData = await EventTask.find()
		// emit to
		io.emit('eventTask_tasks-add', allData.tasks)
		// tampikan dan buat notofiksai ke group user
		
		if(task){
			res.json({
				message: "Add Event Task succesfully",
				data: task
			})
		}
    } catch (error) {
        throw new Error(error.message);
    }
});

/**
 * @id params
 * Event Task parent update
 */
export const updateEventTask = asyncHandler(async(req, res) => {
    try {
        const id = req.params.id
		const {...data} = req.body
		
		const event = await EventTask.findById(id)
		
		if(!event){
			throw new Error("Event Not Found")
		}
		
		event.title = data.title || event.title,
		event.description = data.description || event.description
		event.status = data.status || event.status
		
		const update = await event.save()
		if(update){
			res.json({
				message: "Update Event succesfully",
				data: update
			})
		}
    } catch (error) {
        throw new Error(error.message);
    }
});

export const updateStatusEventTask = asyncHandler(async(req, res) => {
    try {
        
    } catch (error) {
        throw new Error(error.message);
    }
});

/**
 * hapus task parent    
 */
export const deleteEventTask = asyncHandler(async(req, res) => {
    try {
        
    } catch (error) {
        throw new Error(error.message);
    }
});

/**
 *  hapus events[] 
 */
export const deleteEvent = asyncHandler(async(req, res) => {
    try {
        
    } catch (error) {
        throw new Error(error.message);
    }
});