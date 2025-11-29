const Submission = require("../models/Submission");
const Assignment = require("../models/Assignment");

// Student submits assignment
async function submitAssignment(req, res) {
  try {
    const { assignmentId, fileUrl } = req.body;

    if (req.user.role !== "student") {
      return res.status(403).json({ message: "Only students can submit assignments" });
    }

    // Check assignment exists
    const assignment = await Assignment.findById(assignmentId);
    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    // Deadline check
    const now = new Date();
    const due = new Date(assignment.dueDate);

    if (now > due) {
      return res.status(400).json({ message: "Submission deadline has passed" });
    }

    // Check if student already submitted
    const existing = await Submission.findOne({
      assignment: assignmentId,
      student: req.user.id
    });

    if (existing) {
      return res.status(400).json({ message: "You already submitted this assignment" });
    }

    // Save submission
    const submission = new Submission({
      assignment: assignmentId,
      student: req.user.id,
      fileUrl,
      submittedAt: new Date()
    });

    await submission.save();

    res.status(201).json({
      message: "Assignment submitted successfully",
      submission
    });

  } catch (error) {
    console.log("Submit assignment error:", error);
    res.status(500).json({ message: "Server error" });
  }
}

// Teacher views all submissions
async function getSubmissions(req, res) {
  try {
    if (req.user.role !== "teacher") {
      return res.status(403).json({ message: "Only teachers can view submissions" });
    }

    const submissions = await Submission.find()
      .populate("assignment", "title")
      .populate("student", "name email");

    res.json(submissions);

  } catch (error) {
    console.log("Get submissions error:", error);
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = {
  submitAssignment,
  getSubmissions
};
