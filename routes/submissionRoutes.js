const express = require("express");
const router = express.Router();

const {
  submitAssignment,
  getSubmissions
} = require("../controllers/submissionController");

const {
  protect,
  teacherOnly,
  studentOnly
} = require("../middleware/authMiddleware");

// Student submits an assignment
router.post("/submit", protect, studentOnly, submitAssignment);

// Teacher views all submissions
router.get("/", protect, teacherOnly, getSubmissions);

module.exports = router;
