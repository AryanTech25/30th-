// import express from "express";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import bodyParser from "body-parser";
// import cors from "cors";

// const app = express();
// app.use(bodyParser.json());
// app.use(cors());

// const JWT_SECRET = "your_secret_key"; // put in .env later

// // Temporary "database"
// let users = [];  // in-memory array

// // ✅ Signup
// app.post("/auth/signup", async (req, res) => {
//   const { email, password, name } = req.body;

//   const existingUser = users.find(u => u.email === email);
//   if (existingUser) return res.status(400).json({ error: "Email already registered" });

//   const hash = await bcrypt.hash(password, 10);

//   const newUser = { id: Date.now().toString(), email, passwordHash: hash, name };
//   users.push(newUser);

//   res.json({ message: "User registered successfully", user: { id: newUser.id, email, name } });
// });

// // ✅ Signin
// app.post("/auth/signin", async (req, res) => {
//   const { email, password } = req.body;

//   const user = users.find(u => u.email === email);
//   if (!user) return res.status(400).json({ error: "Invalid credentials" });

//   const isMatch = await bcrypt.compare(password, user.passwordHash);
//   if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

//   const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });

//   res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
// });

// // ✅ Protected route example
// app.get("/auth/me", (req, res) => {
//   const token = req.headers.authorization?.split(" ")[1];
//   if (!token) return res.status(401).json({ error: "No token provided" });

//   try {
//     const decoded = jwt.verify(token, JWT_SECRET);
//     const user = users.find(u => u.id === decoded.id);
//     if (!user) return res.status(404).json({ error: "User not found" });

//     res.json({ user: { id: user.id, email: user.email, name: user.name } });
//   } catch (err) {
//     res.status(401).json({ error: "Invalid token" });
//   }
// });

// app.listen(5000, () => console.log("Server running on port 3000"));
