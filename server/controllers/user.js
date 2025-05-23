const EducationInfo = require("../models/education")
const PersonalInfo = require("../models/personal")
const ProjectsInfo = require("../models/projects")
const User = require("../models/user")


exports.personalInfo = async (req, res) => {
    try {
        const { _id, name, email, addressLine1, addressLine2 = '', city, state, zipcode } = req.body
        const { user } = req
        if (_id) {
            return await updatePersonalInfo(_id, name, email, addressLine1, addressLine2, city, state, zipcode, res)
        }

        if (!name || !email || !addressLine1 || !city || !state || !zipcode) {
            return res.status(400).json({
                success: false,
                message: "All fields required"
            })
        }

        const personalInfo = await PersonalInfo.create({
            name,
            email,
            addressLine1,
            addressLine2,
            city,
            state,
            zipcode
        })

        const userData = await User.findById(user._id)

        userData.personalInfo = personalInfo._id
        await userData.save()

        return res.status(200).json({
            success: true,
            message: "Personal Info added",
            personalInfo
        })

    } catch (error) {
        console.log("Error personalInfo", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })

    }
}

async function updatePersonalInfo(_id, name, email, addressLine1, addressLine2, city, state, zipcode, res) {
    try {
        const users_PersonalInfo = await PersonalInfo.findById(_id);

        if (!users_PersonalInfo) {
            return res.status(404).json({
                success: false,
                message: "Personal Info not found"
            })
        }
        if (name) {
            users_PersonalInfo.name = name
        }
        if (email) {
            users_PersonalInfo.email = email
        }
        if (addressLine1) {
            users_PersonalInfo.addressLine1 = addressLine1
        }
        if (addressLine2) {
            users_PersonalInfo.addressLine2 = addressLine2
        }
        if (city) {
            users_PersonalInfo.city = city
        }
        if (state) {
            users_PersonalInfo.state = state
        }
        if (zipcode) {
            users_PersonalInfo.zipcode = zipcode
        }

        await users_PersonalInfo.save()

        return res.status(200).json({
            success: true,
            message: "Updated successfully",
            personalInfo: users_PersonalInfo
        })
    } catch (error) {
        console.log("Error updatePersonalInfo", error);
        return res.status(500).json({
            success: false,
            message: "Failed to update"
        })

    }
}

exports.educationInfo = async (req, res) => {
    try {
        const { _id, isStudying, institutionName } = req.body
        const { user } = req

        if (!isStudying) {
            return res.status(400).json({
                success: false,
                message: "All fields required"
            })
        }


        if (_id) {
            return await updateEducationInfo(_id, institutionName, isStudying, res)
        }

        const educationInfo = await EducationInfo.create({
            isStudying,
            institutionName
        })

        const userData = await User.findById(user._id)

        userData.educationInfo = educationInfo._id
        await userData.save()

        return res.status(200).json({
            success: true,
            message: "Education Info added",
            educationInfo
        })

    } catch (error) {
        console.log("Error EducationInfo", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })

    }
}

async function updateEducationInfo(_id, institutionName, isStudying, res) {
    try {
        const users_EducationInfo = await EducationInfo.findById(_id);

        if (!users_EducationInfo) {
            return res.status(404).json({
                success: false,
                message: "Education Info not found"
            })
        }
        if (isStudying) {
            users_EducationInfo.isStudying = isStudying
        }

        if (institutionName) {
            users_EducationInfo.institutionName = institutionName
        }

        if (isStudying == "no") {
            users_EducationInfo.institutionName = ""
        }


        await users_EducationInfo.save()

        return res.status(200).json({
            success: true,
            message: "Updated successfully",
            educationInfo: users_EducationInfo
        })
    } catch (error) {
        console.log("Error educationInfo", error);
        return res.status(500).json({
            success: false,
            message: "Failed to update"
        })
    }
}


exports.projectInfo = async (req, res) => {
    try {
        const { _id, name, description } = req.body
        const { user } = req

        if (!name || !description) {
            return res.status(400).json({
                success: false,
                message: "All fields required"
            })
        }

        if (_id) {
            return await updateProjectInfo(_id, name, description, user, res)
        }

        const projectsInfo = await ProjectsInfo.create({
            name,
            description
        })

        let userData = await User.findByIdAndUpdate(user._id, {
            $push: {
                projectsInfo: projectsInfo._id
            }
        }, { new: true }).populate("projectsInfo")

        return res.status(200).json({
            success: true,
            message: "Project Info added",
            projectsInfo: userData.projectsInfo
        })

    } catch (error) {
        console.log("Error projectInfo", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })

    }
}

async function updateProjectInfo(_id, name, description, user, res) {
    try {
        const users_ProjectsInfo = await ProjectsInfo.findById(_id);

        if (!users_ProjectsInfo) {
            return res.status(404).json({
                success: false,
                message: "Project Info not found"
            })
        }
        if (name) {
            users_ProjectsInfo.name = name
        }

        if (description) {
            users_ProjectsInfo.description = description
        }


        await users_ProjectsInfo.save()

        const userData = await User.findById(user._id).populate("projectsInfo")

        return res.status(200).json({
            success: true,
            message: "Updated successfully",
            projectsInfo: userData.projectsInfo
        })

    } catch (error) {
        console.log("Error users_ProjectsInfo", error);
        return res.status(500).json({
            success: false,
            message: "Failed to update"
        })
    }
}

exports.deleteProject = async (req, res) => {
    try {
        const { _id } = req.body;
        const { user } = req;

        if (!_id) {
            return res.status(400).json({
                success: false,
                message: "Project ID is required",
            });
        }

        const projectInfo = await ProjectsInfo.findById(_id);

        if (!projectInfo) {
            return res.status(404).json({
                success: false,
                message: "Project not found",
            });
        }

        await ProjectsInfo.findByIdAndDelete(_id);

        const userData = await User.findByIdAndUpdate(user._id, {
            $pull: {
                projectsInfo: _id
            }
        }, { new: true }).populate("projectsInfo")

        return res.status(200).json({
            success: true,
            message: "Project deleted successfully",
            projectsInfo: userData.projectsInfo
        });

    } catch (error) {
        console.error("Error deleting project:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};
