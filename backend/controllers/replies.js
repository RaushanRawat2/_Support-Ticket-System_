const Ticket = require('../models/Ticket');

// Add reply to ticket
exports.addReply = async (req, res) => {
  try {
    const { sender, message } = req.body;

    const ticket = await Ticket.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          conversation: {
            sender,
            message
          }
        },
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