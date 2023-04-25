const Event = require('../models/eventModel')
const mongoose = require('mongoose')

//get all event
const getEvents = async (req, res) => {
  const user_id=req.user._id


    const event = await Event.find({}).sort({createdAt: -1})
  
    res.status(200).json(event)
  }
//get a single event

const getEvent = async (req, res) => {
    const { id } = req.params
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({error: 'No such event'})
    }
  
    const event = await Event.findById(id)
  
    if (!event) {
      return res.status(404).json({error: 'No such event'})
    }
   res.status(200).json(event)
  }


//create a new event

const createEvent=async (req,res)=>{
    const {title,description,date} = req.body
  // add doc to db
    try {
      const user_id=req.user._id
      const event = await Event.create({title, description, date,user_id})
      res.status(200).json(event)
    } catch (error) {
      res.status(400).json({error: error.message})
    }
}


//delete a event
const deleteEvent=async(req,res)=>{
    const {id}=req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such event'})
      }
      const event=await Event.findOneAndDelete({_id:id})
      if (!event) {
        return res.status(404).json({error: 'No such event'})
      }
      res.status(200).json(event)
}

//update a event
const updateEvent=async(req,res)=>{
    const {id}=req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such event'})
      }
      const event=await Event.findByIdAndUpdate({_id:id},{
        ...req.body
      })
      if (!event) {
        return res.status(404).json({error: 'No such event'})
      }
      res.status(200).json(event)
}


module.exports={
    createEvent,
    getEvents,
    getEvent,
    deleteEvent,
    updateEvent,
}