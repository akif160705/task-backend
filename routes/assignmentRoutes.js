const express = require("express");
const router = express.Router();

const {
  createAssignment,
  getAssignments,
  submitAssignment,
  getSubmissions
} = require("../controllers/assignmentController");

const {
  protect,
  teacherOnly,
  studentOnly
} = require("../middleware/authMiddleware");

// Teacher creates assignment
router.post("/create", protect, teacherOnly, createAssignment);

// Students can submit
router.post("/submit/:id", protect, studentOnly, submitAssignment);

// Everyone can view assignments
router.get("/", protect, getAssignments);

// Teacher views submissions
router.get("/submissions/:id", protect, teacherOnly, getSubmissions);

module.exports = router;
