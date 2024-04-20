const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "todo_db",
  port: "3306",
});

db.connect((err) => {
  if (err) {
    console.log(err, "err");
  }
  console.log("Database connected...");
});

const invalidatedTokens = [];

const crypto = require("crypto");

const secretKey = crypto.randomBytes(32).toString("hex");

// Middleware to verify token
function verifyToken(req, res, next) {
  if (req.url === "/user/login" || req.url === "/register") {
    return next();
  }
  const token = req?.headers.authorization?.split(" ")[1]; // Extract token from Authorization header
  if (!token) {
    return res.status(401).send({ message: "Token is missing" });
  }

  if (invalidatedTokens.includes(token)) {
    return res.status(401).send({ message: "Token is invalidated" });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(401).send({ message: "Token is invalid or expired" });
    }
    // decoded -> has the payload of token after it has been verified.
    req.user = decoded;
    next();
  });
}

app.use("", verifyToken);

// User logout endpoint
app.post("/user/logout", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract token from Authorization header
  // Invalidate the token
  invalidatedTokens.push(token);
  res.status(200).send({ message: "Logout successful" });
});

// Get all data
app.get("/user", (req, res) => {
  let sessionData = req.user;
  let userId = sessionData.userId;
  let qr = `SELECT * FROM tasks where id = ${userId}`;
  console.log("Getting all the tasks for user", sessionData.email);

  db.query(qr, (err, result) => {
    if (err) {
      console.log(err, "errs");
      return res.status(500).send({ message: "Error fetching user data" });
    }
    if (result.length > 0) {
      res.send({
        message: "All user data",
        data: result,
      });
    } else {
      res.send({
        message: "No entry found",
        data: [],
      });
    }
  });
});

// Get single data
app.get("/user/:id", (req, res) => {
  let task_id = req.params.id;

  let qr = `SELECT * FROM tasks WHERE task_id = ${task_id}`;

  db.query(qr, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send({ message: "Error fetching user data" });
    }

    if (result.length > 0) {
      res.send({
        message: "Get single data",
        data: result,
      });
    } else {
      res.send({
        message: "Data not found",
      });
    }
  });
});

// Create data
app.post("/user", (req, res) => {
  console.log(req.body, "createdata");
  let sessionData = req.user;

  let userId = sessionData.userId;
  let task_name = req.body.task_name;
  let task_details = req.body.task_details;

  let qr = `INSERT INTO tasks (task_name, task_details, id) VALUES ('${task_name}', '${task_details}', '${userId}')`;

  db.query(qr, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send({
        message: "Data insertion failed",
      });
    } else {
      console.log(result, "result");
      res.send({
        message: "Data inserted",
      });
    }
  });
});

// Update single data
app.put("/user/:id", (req, res) => {
  console.log(req.body, "updatedata");

  let task_id = parseInt(req.params.id);
  let task_name = req.body.task_name;
  let task_details = req.body.task_details;

  let qr = `UPDATE tasks SET task_name = '${task_name}', task_details = '${task_details}' WHERE task_id = ${task_id}`;

  db.query(qr, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send({
        message: "Data update failed",
      });
    } else {
      res.send({
        message: "Data updated",
      });
    }
  });
});

// Delete single data
app.delete("/user/:id", (req, res) => {
  let task_Id = req.params.id;

  let qr = `DELETE FROM tasks WHERE task_id  = ${task_Id}`;

  db.query(qr, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send({
        message: "Data deletion failed",
      });
    } else {
      res.send({
        message: "Data deleted",
      });
    }
  });
});

// User registration endpoint
app.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).send({
      message:
        "All details are mandatory. Please provide name, email, and password.",
    });
  }

  // Check if the email already exists
  const checkEmailQr = `SELECT * FROM loginuser WHERE email = ?`;
  db.query(checkEmailQr, [email], (checkErr, checkResult) => {
    if (checkErr) {
      console.log(checkErr);
      return res.status(500).send({ message: "Registration failed" });
    }

    if (checkResult.length > 0) {
      // Email already exists
      return res.status(409).send({
        message: "Email already exists. Please use a different email.",
      });
    }

    const insertQr = `INSERT INTO loginuser (name, email, password) VALUES (?, ?, ?)`;
    db.query(insertQr, [name, email, password], (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send({ message: "Registration failed" });
      }

      res.status(201).send({ message: "User registered successfully" });
    });
  });
});

// User login endpoint
app.post("/user/login", (req, res) => {
  const { email, password } = req.body;

  const qr = `SELECT * FROM loginuser WHERE email = ?`;

  db.query(qr, [email], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send({ message: "Login failed" });
    }

    if (result.length === 0) {
      // No user found with that email
      res.status(401).send({ message: "Invalid email" });
    } else {
      // Check if the password matches
      const user = result[0];
      if (user.password !== password) {
        res.status(401).send({ message: "Invalid password" });
      } else {
        const token = jwt.sign({ email: email, userId: user.id }, secretKey, {
          expiresIn: "10m",
        });

        res.status(200).send({ message: "Login successful", token: token });
      }
    }
  });
});

// Add a new endpoint to get all registered user details
app.get("/registeredUsers", (req, res) => {
  const qr = `SELECT * FROM loginuser`;

  db.query(qr, (err, result) => {
    if (err) {
      console.log(err);
      return res
        .status(500)
        .send({ message: "Error fetching registered users" });
    }

    if (result.length > 0) {
      res.send({
        message: "All registered user details",
        data: result,
      });
    } else {
      res.send({
        message: "No registered users found",
        data: [],
      });
    }
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
