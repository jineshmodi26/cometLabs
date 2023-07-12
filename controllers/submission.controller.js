const getError = require("../utils/dbErrorHandle");

module.exports = {
    createSubmission : async (req, res) => {
        try {
            const { sourceCode, compilerId, questionId } = req.body
            //axios call at Sphere Engine API for Create Submission
            return res.status(200).json({
                data : "success"
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