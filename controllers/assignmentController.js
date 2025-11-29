const Assignment = require("../models/Assignment");

// Teacher creates assignment
async function createAssignment(req, res) {
  try {
    const { title, description, dueDate } = req.body;

    // Only teachers can create assignments
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

// Get all assignments (students + teachers)
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

module.exports = {
  createAssignment,
  getAssignments
};
