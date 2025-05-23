const mongoose = require("mongoose");

const educationInfo = new mongoose.Schema({
    isStudying: {
        type: String,
        required: true,
        trim: true
    },
    institutionName: {
        type: String,
        trim: true
    },
})

const EducationInfo = mongoose.model("EducationInfo", educationInfo)
module.exports = EducationInfo