Student–Teacher Assignment Backend

Backend API for an assignment management system. Built with Node.js, Express, MongoDB, JWT authentication.


---
Features

Register & Login (Teacher + Student)

Teachers

Create assignments

View all assignments

View submissions for each assignment


Students

View assignments

Submit assignment (fileUrl)

Prevent duplicate submissions


JWT based authentication

Protected routes

MongoDB Atlas



---

Tech Stack

Node.js

Express.js

MongoDB + Mongoose

JWT

Bcrypt

CORS

Thunder Client Testing



---
 API Routes

 Auth

POST /api/auth/register
POST /api/auth/login

 Assignments

POST /api/assignments/create — teacher only
GET /api/assignments — teacher & student

 Submission

POST /api/assignments/submit/:id — student only
GET /api/assignments/submissions/:id — teacher only


---
 Environment Variables

Create .env file:

MONGO_URI=your_mongo_url
JWT_SECRET=your_secret
PORT=5000


---
 Run Locally

npm install
npm start

Backend will run on:

http://localhost:5000


---
