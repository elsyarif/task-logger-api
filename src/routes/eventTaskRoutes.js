import express from 'express'

eventTaskRoutes = express.Router()

eventTaskRoutes.get("/", (req, res )=>{
	res.send("Route Event Task")
})

export default eventTaskRoutes;