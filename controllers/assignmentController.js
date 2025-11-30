const Assignment = require("../models/Assignment");
const Submission = require("../models/Submission");

// Teacher creates assignment
async function createAssignment(req, res) {
  try {
    const { title, description, dueDate } = req.body;

    if (req.user.role !== "teacher") {
      return res.status(403).json({ message: "Only teachers can create assignments" });
    }

    if (!title || !description || !dueDate) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const assignment = new Assignment({
      title,
      description,
      dueDate,
      teacher: req.user.id
    });

    await assignment.save();

    res.status(201).json({
      message: "Assignment created successfully",
      assignment
    });

  } catch (error) {
    console.log("Create assignment error:", error);
    res.status(500).json({ message: "Server error" });
  }
}

// Get all assignments
async function getAssignments(req, res) {
  try {
    const assignments = await Assignment.find()
      .populate("teacher", "name email");

    res.json(assignments);
  } catch (error) {
    console.log("Get assignments error:", error);
    res.status(500).json({ message: "Server error" });
  }
}

// Student submits assignment
async function submitAssignment(req, res) {
  try {
    const assignmentId = req.params.id;
    const { fileUrl } = req.body;

    if (req.user.role !== "student") {
      return res.status(403).json({ message: "Only students can submit" });
    }

    const assignment = await Assignment.findById(assignmentId);

    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    if (new Date() > assignment.dueDate) {
      return res.status(400).json({ message: "Submission deadline passed" });
    }

    const submission = new Submission({
      assignment: assignmentId,
      student: req.user.id,
      fileUrl,
    });

    await submission.save();

    res.status(201).json({
      message: "Assignment submitted",
      submission
    });

  } catch (error) {
    console.log("Submit error:", error);
    res.status(500).json({ message: "Server error" });
  }
}

// Teacher can see submissions for an assignment
async function getSubmissions(req, res) {
  try {
    const assignmentId = req.params.id;

    const submissions = await Submission.find({ assignment: assignmentId })
      .populate("student", "name email");

    res.json(submissions);

  } catch (error) {
    console.log("Get submissions error:", error);
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = {
  createAssignment,
  getAssignments,
  submitAssignment,
  getSubmissions
};
