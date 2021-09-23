import asyncHandler from "express-async-handler";

import EventSch from "../models/eventSch.js";
import { io } from "../index.js";

export const getEventSch = asyncHandler(async(req, res) => {
    try {
        const groupId = req.user.groupId
		
		const currentPage = Number(req.query.page) || 1;
		const perPage = Number(req.query.limit) || 5;
		let totalItems; 
		
		const count = await EventSch.countDocuments()
		totalItems = count
		
		const event = await EventSch.find().skip((currentPage - 1) * perPage).limit(perPage);
		
		if(event){
		  res.json({
			message: "Find all Event Schedule successfully",
			data: event,
			total_data: totalItems,
			per_page: perPage,
			current_page: currentPage,
		  });
		}
    } catch (error) {
        throw new Error(error.message);
    }
});

export const getEventSchById = asyncHandler(async(req, res) => {
    try {
        const id = req.params.id
		const groupId = req.user.groupId
		
		const event = await EventSch.findById(id)
		
		if(!event){
			throw new Error('Event not found')
		}
		
		res.json({
			message: "Get Event by id Succesfully",
			data: event
		})
    } catch (error) {
        throw new Error(error.message);
    }
});

export const createEventSch = asyncHandler(async(req, res) => {
    try {
        const { title, description, start_date, end_date } = req.body
		const groupId = req.user.groupId
		
		const eventsch = await EventSch.create({
			title,
			description,
			start_date,
			end_date,
			groupId
		})
		//get all data
		const allData = await EventSch.find()
		// emit to
		io.emit('eventsch-add', allData)
		// tampikan dan buat notofiksai ke group user
		
		if(eventsch){
			res.json({
				message: "create sevent schedule successfully",
				data: eventsch
			})
		}
    } catch (error) {
        throw new Error(error.message);
    }
});

export const updateEventSch = asyncHandler(async(req, res) => {
    try {
        const id = req.params.id
		const { title, description, start_date, end_date } = req.body
		
		const event = await EventSch.findById(id)
		event.title = title || event.title
		event.description = description || event.description
		event.start_date = start_date || event.start_date
		event.end_date = end_date || event.end_date
		
		count update =  await event,save()
		
		if(!update){
			throw new Error('Update failed')
		}
		//get all data
		const allData = await EventSch.find()
		// emit to
		io.emit('eventsch-update', allData)
		// tampikan dan buat notofiksai ke group user
		
		res.json({
			message: "update succesfully",
			data: update
		})
    } catch (error) {
        throw new Error(error.message);
    }
});

export const updateStatusEventSch = asyncHandler(async(req, res) => {
    try {
        
    } catch (error) {
        throw new Error(error.message);
    }
});

export const deleteEventSch = asyncHandler(async(req, res) => {
    try {
        const id = req.params.id
		const event = await EventSch.findById(id)
		
		if(!event){
			throw new Error('Event not found')
		}
		
		const remove = await EventSch.deleteOne({
			_id: id
		})
		
		//get all data
		const allData = await EventSch.find()
		// emit to
		io.emit('eventsch-remove', allData)
		// tampikan dan buat notofiksai ke group user
		
		res.json({
		  message: "Delete Event Succesfully",
		  data: remove,
		});
    } catch (error) {
        throw new Error(error.message);
    }
});