const express = require("express");
const router = express.Router();

const { createAssignment, getAssignments } = require("../controllers/assignmentController");
const authMiddleware = require("../middleware/authMiddleware");

// Teacher creates assignment
router.post("/create", authMiddleware, createAssignment);

// Anyone logged in (student/teacher) can view assignments
router.get("/", authMiddleware, getAssignments);

module.exports = router;
