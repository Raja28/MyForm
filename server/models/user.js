const { default: mongoose } = require("mongoose");
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    personalInfo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PersonalInfo"
    },
    educationInfo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "EducationInfo"
    },
    projectsInfo: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "ProjectsInfo"
    }],
}, { timestamps: true })


// Hash password before saving
userSchema.pre("save", async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

const User = mongoose.model("User", userSchema)
module.exports = User