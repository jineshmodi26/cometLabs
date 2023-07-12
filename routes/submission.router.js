const express = require("express")
const router = express.Router()
const submissionCtrl = require("../controllers/submission.controller")
const { isParticipants } = require("../middlewares/authorization")
 
router.post("/", isParticipants, submissionCtrl.createSubmission)

module.exports = router