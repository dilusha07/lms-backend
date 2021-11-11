const express = require('express');
const router = express.Router();

const memberController = require('../controllers/member.controller');

//member: Get the list of members 
router.get('/member', memberController.getMembers);

// /member/1: get member 1
// /member/:id
router.get("/member/:id", memberController.getMember);

//Create Member
router.post("/member", memberController.addMember);

//Update Member Details
router.put("/member/:id", memberController.editMember);

//Delete Member
router.delete("/member/:id", memberController.deleteMember);

module.exports = router;