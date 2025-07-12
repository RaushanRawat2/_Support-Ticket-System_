const Ticket = require('../models/Ticket');
const fs = require('fs');
const path = require('path');
const uploadOnCloudinary = require('../config/cloudinary');

// Create a new ticket // jab bhi frontend se koi create ticket request aayegi tab toh ye function hit hogi for creating a new ticket for issue.

exports.createTicket = async (req, res) => {
  try {
    const { name, email, issue } = req.body;
   // const screenshot = req.file ? `/uploads/${req.file.filename}` : null;
    let screenshot;
        if(req.file){
            screenshot=await uploadOnCloudinary(req.file.path)
        }

    const ticket = new Ticket({
      name,
      email,
      issue,
      screenshot,
      conversation: [{
        sender: 'user',
        message: issue
      }]
    });

    await ticket.save();
    
    res.status(201).json(ticket);
  } catch (err) {
    // Clean up uploaded file if error occurs
    if (req.file) {
      fs.unlink(path.join(__dirname, '../uploads', req.file.filename), () => {});
    }
    res.status(400).json({ 
      success: false,
      error: err.message 
    });
  }
};

// Get all tickets  // jab admin ko pure tickets visit krne hai then this function would be used for getting all tickets.

exports.getTickets = async (req, res) => {
  try {
    const { email, status } = req.query;
    let query = {};

    if (email) query.email = email;
    if (status) query.status = status;

    const tickets = await Ticket.find(query).sort({ updatedAt: -1 });
    res.status(200).json({
      success: true,
      count: tickets.length,
      data: tickets
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// Get single ticket   // agar hme koi perticular ticket chahiye then we will use this function for getting single ticket.

exports.getTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({
        success: false,
        error: 'Ticket not found'
      });
    }

    res.status(200).json({
      success: true,
      data: ticket
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};

// Update ticket status
exports.updateStatus = async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndUpdate(
      req.params.id,
      { 
        status: req.body.status,
        updatedAt: Date.now()
      },
      { new: true, runValidators: true }
    );

    if (!ticket) {
      return res.status(404).json({
        success: false,
        error: 'Ticket not found'
      });
    }

    res.status(200).json({
      success: true,
      data: ticket
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};