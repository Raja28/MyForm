const { default: mongoose } = require("mongoose")
require("dotenv").config()
exports.connection = async (req, res) => {
    try {
        const resp = await mongoose.connect(process.env.MONGODB_URL)
        if (resp) {
            console.log("MyForm DB connected successfully");
        }
    } catch (error) {
        console.log("Error connecting MyForm DB :", error);

    }
}