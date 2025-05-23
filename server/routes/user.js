const express = require("express")
const router = express.Router()
const { personalInfo, educationInfo, projectInfo, deleteProject } = require("../controllers/user")
const { auth } = require("../middlewares/auth")

router.post("/personal_info", auth, personalInfo)
router.post("/education_info", auth, educationInfo)
router.post("/project_info", auth, projectInfo)
router.post("/project_delete", auth, deleteProject)

module.exports = router