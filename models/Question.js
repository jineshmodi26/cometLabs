const mongoose = require("mongoose")

const questionSchema = mongoose.Schema({
    name : {
        type :String,
        required : "Name is required"
    },
    description : {
        type :String,
        required : "Description is required"
    },
    created_by : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : "Auther is required"
    },
    testcases : [{
        input : {
            type : String,
            required : "Input is required"   
        },
        output : {
            type : String,
            required : "Output is required"
        }
    }]
},{
    timestamps: true
})

const Question = mongoose.model("Question", questionSchema)

module.exports = Question