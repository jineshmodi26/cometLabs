const Question = require("../models/Question")
const getError = require("../utils/dbErrorHandle");

module.exports = {
    addQuestion : async (req, res) => {
        try {
            const {name, description, user} = req.body
            const question = Question({
                name : name,
                description : description,
                created_by : user
            })
            await question.save();
            return res.status(200).json({
                data : "Question added successfully."
            })
        } catch (error) {
            let errMsg = getError(error)
            return res.status(400).json({
                error: true,
                message:  errMsg.length > 0 ? errMsg : "Something went wrong."
            })
        }
    },
    editQuestion : async (req, res) => {
        try {
            const {id} = req.params;
            const {name, description, user} = req.body
            await Question.findByIdAndUpdate(id, {
                name : name,
                description : description,
                created_by : user
            })
            return res.status(200).json({
                data : "Question updated successfully."
            })
        } catch (error) {
            let errMsg = getError(error)
            return res.status(400).json({
                error: true,
                message:  errMsg.length > 0 ? errMsg : "Something went wrong."
            })
        }
    },
    deleteQuestion : async (req, res) => {
        try {
            const {id} = req.params;
            await Question.findByIdAndDelete(id);
            return res.status(200).json({
                data : "Question deleted successfully."
            })
        } catch (error) {
            let errMsg = getError(error)
            return res.status(400).json({
                error: true,
                message:  errMsg.length > 0 ? errMsg : "Something went wrong."
            })
        }
    },
    addTestCases : async (req, res) => {
        try {
            const {id} = req.params
            const {input, output} = req.body
            const question = await Question.findOne({_id : id})
            await Question.findByIdAndUpdate(id, {
                name : question.name,
                description : question.description,
                created_by : question.user,
                testcases : [...question.testcases, {input : input, output : output}]
            })
            return res.status(200).json({
                data : "Test cases added successfully."
            })
        } catch (error) {
            let errMsg = getError(error)
            return res.status(400).json({
                error: true,
                message:  errMsg.length > 0 ? errMsg : "Something went wrong."
            })
        }
    }
}