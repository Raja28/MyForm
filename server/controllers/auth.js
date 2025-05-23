const bcrypt = require("bcrypt")
const User = require("../models/user")
const Projects = require("../models/projects")
const Education = require("../models/education")
const Personal = require("../models/personal")
const jwt = require("jsonwebtoken")


exports.signup = async (req, res) => {
    try {
        const { name, email, password, confirmPassword } = req.body

        if (!name || !email || !password || !confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "All Feilds Required"
            })
        }

        const userExists = await User.findOne({ email })

        if (userExists) {
            return res.status(400).json({
                success: false,
                message: "User exists, Please login"
            })
        }

        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Passwords do not match"
            });
        }



        // const encrtptedPassword = await bcrypt.hash(password, 10)

        let newUser = await User.create({
            name,
            email,
            password
        })
        // newUser.password

        const tokenPayload = {
            _id: newUser._id,
            email: newUser.email
        }

        const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: "24h" })

        const user = {
            name,
            email,
            _id: newUser._id,
            profileImage: `https://api.dicebear.com/5.x/initials/svg?seed=${name}`
        }

        res.status(200).json({
            success: true,
            message: 'Signup Successfull',
            user,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: "Failed to SignUp"
        })

    }
}


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email & Password Required"
            });
        }

        const isUserRegistered = await User.findOne({ email })
            .populate("personalInfo")
            .populate("educationInfo")
            .populate({
                path: "projectsInfo",
                options: { sort: { createdAt: -1 } }
            });

        if (!isUserRegistered) {
            return res.status(401).json({
                success: false,
                message: "User Not Registered, Please Signup"
            });
        }

        const isPasswordValid = await bcrypt.compare(password, isUserRegistered.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid Password"
            });
        }
        const tokenPayload = {
            _id: isUserRegistered._id,
            email: isUserRegistered.email
        };
        const expiresIn = 24 * 60 * 60; // 24 hours in seconds
        const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn });

        isUserRegistered.password = undefined;
        const user = isUserRegistered.toObject();

        user.profileImage = `https://api.dicebear.com/5.x/initials/svg?seed=${isUserRegistered?.name}`

        // Send success response
        return res.status(200).json({
            success: true,
            message: "Login Successful",
            user,
            token
        });

    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({
            success: false,
            message: "Login Failed, Please Try Again"
        });
    }
};
