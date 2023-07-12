const express = require("express")
const router = express.Router()
const questionCtrl = require("../controllers/question.controller")
const adminAccess = require("../middlewares/adminAccess")

router.post("/", adminAccess.isAdmin, questionCtrl.addQuestion)

router.patch("/:id", adminAccess.isAdmin, questionCtrl.editQuestion)

router.delete("/:id", adminAccess.isAdmin, questionCtrl.deleteQuestion)

router.post("/:id/testcases", adminAccess.isAdmin, questionCtrl.addTestCases)

module.exports = router