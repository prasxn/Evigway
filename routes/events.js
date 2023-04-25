const express = require('express')
const {
    createEvent,
    getEvents,
    getEvent,
    deleteEvent,
    updateEvent
    
} =require("../controllers/eventControllers")
const requireAuth=require('../middleware/requireAuth')




const router = express.Router()

//require auth for all event routes
router.use(requireAuth)
// GET all event
router.get('/', getEvents)

// GET a single event
router.get('/:id', getEvent)

// POST a new event
router.post('/',createEvent)

// DELETE a event
router.delete('/:id', deleteEvent)

// UPDATE a event
router.patch('/:id',updateEvent)

module.exports = router