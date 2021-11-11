const express = require('express');
const router = express.Router();

const memberController = require('../controllers/member.controller');

//member: Get the list of members 
router.get('/member', memberController.getMembers);

module.exports = router;