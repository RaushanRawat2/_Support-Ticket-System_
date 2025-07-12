const express = require('express');
const router = express.Router();
const upload = require('../config/multer');
const {
  createTicket,
  getTickets,
  getTicket,
  updateStatus
} = require('../controllers/tickets');
const { addReply } = require('../controllers/replies');
const {adminLogin} = require('../controllers/adminController')
//const {verifyCode} = require('../controllers/accessCodeController');

// Ticket routes // ticket se related jitne bhi frontend request honge everything wii be handled by usin this routes .

router.post('/tickets', upload.single('screenshot'), createTicket);
router.get('/tickets', getTickets);
router.get('/tickets/:id', getTicket);
router.patch('/tickets/:id/status', updateStatus);

router.post('/adminLogin',adminLogin);
// Reply routes  // this routes will works for only reply process by the admin.

router.post('/tickets/:id/reply', addReply);

module.exports = router;