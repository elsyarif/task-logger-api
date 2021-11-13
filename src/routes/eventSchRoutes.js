import express from 'express'

eventSchRoutes = express.Router()

eventSchRoutes.get("/", (req, res )=>{
	res.send("Route Event Sechedule")
})

export default eventSchRoutes;