const express = require("express");
const router = express.Router();

const { submitAssignment, getSubmissions } = require("../controllers/submissionController");
const authMiddleware = require("../middleware/authMiddleware");

// Student submits assignment
router.post("/submit", authMiddleware, submitAssignment);

// Teacher views submissions
router.get("/", authMiddleware, getSubmissions);

module.exports = router;
