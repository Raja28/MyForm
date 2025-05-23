const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    description: {
        type: String,
        required: true 
    }
}, { timestamps: true });

const ProjectsInfo = mongoose.model("ProjectsInfo", projectSchema);
module.exports = ProjectsInfo;
