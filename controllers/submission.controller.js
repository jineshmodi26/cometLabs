const getError = require("../utils/dbErrorHandle");
const axios = require("axios");
const Question = require("../models/Question");

module.exports = {

    //compiler IDs
    //c++ - 44
    //java - 10
    //python - 116
    //c - 11

    createSubmission : async (req, res) => {
        try {
            const { sourceCode, compilerId, questionId } = req.body

            const question = await Question.findOne({ _id : questionId});

            if (!question) {
                return res.status(400).json({
                    data : "Question not found."
                })
            }

            await axios({
                method : "POST",
                url : `https://0a1a6d99.problems.sphere-engine.com/api/v4/judges?access_token=${process.env.ACCESS_TOKEN_PROBLEM}`,
                data : {
                    compilerId : parseInt(compilerId),
                    source : sourceCode,
                    typeId : 1
                }
            }).then(async (response) => {
                const masterJudgeId = response.data.id
                await axios({
                    method : "POST",
                    url : `https://0a1a6d99.problems.sphere-engine.com/api/v4/problems?access_token=${process.env.ACCESS_TOKEN_PROBLEM}`,
                    data : {
                        name : question.name,
                        body : question.description,
                        masterjudgeId  : masterJudgeId
                    }
                }).then(async (problemResponse) => {

                    await axios({
                        method : "POST",
                        url : `https://0a1a6d99.problems.sphere-engine.com/api/v4/submissions?access_token=${process.env.ACCESS_TOKEN_PROBLEM}`,
                        data : {
                            problemId : problemResponse.data.id,
                            source : sourceCode,
                            compilerId : compilerId
                        }
                    }).then((subResponse) => {
                        return res.status(200).json({
                            data : "Done"
                        })
                    }).catch((error) => {
                        return res.status(400).json({
                            error: true,
                            message:  "Submission not done."
                        })
                    })
                }).catch((error) => {
                    return res.status(400).json({
                        error: true,
                        message:  "Problem not created."
                    })
                }) 
            }).catch((error) => {
                return res.status(400).json({
                    error: true,
                    message:  "Judge not created"
                })
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