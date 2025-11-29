const User = require("../models/user");
const { hash, compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");

// REGISTER USER (student or teacher)
async function registerUser(req, res) {
  try {
    const { name, email, password, role } = req.body;

    // basic validation
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // hash password
    const hashedPassword = await hash(password, 10);

    // create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });


  } catch (error) {
    console.log("Register error:", error);
    res.status(500).json({ message: "Server error" });
  }
}

// LOGIN USER
async function loginUser(req, res) {
  try {
    const { email, password, role } = req.body;

    // check user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    // verify password
    const isMatch = await compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    // check role match
    if (user.role !== role) {
      return res.status(403).json({ message: "Not allowed to login as this role" });
    }

    // generate token
    const token = sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        name: user.name,
        email: user.email,
        role: user.role
      }
    });


  } catch (error) {
    console.log("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = {
  registerUser,
  loginUser
};
