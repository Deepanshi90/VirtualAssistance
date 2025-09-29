import express from "express";
import dotenv from "dotenv";
dotenv.config();

import connectDb from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./routes/user.routes.js";
import geminiResponse from "./gemini.js";

const app = express();
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true })); // optional but useful
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

// app.get("/", async (req, res) => {
//   res.send("API is running...");
//   let prompt = req.query.prompt;
//   console.log(prompt);
//   let data = await geminiResponse(prompt)
//     res.json(data);
// });

app.get("/", async (req, res) => {
  try {
    let prompt = req.query.prompt; // ✅ use prompt
    if (!prompt) {
      return res.status(400).json({ error: "Missing 'prompt' query parameter" });
    }

    console.log("Prompt:", prompt);
    let data = await geminiResponse(prompt);
    res.json(data); // ✅ only send one response
  } catch (err) {
    console.error("Error generating Gemini response:", err.message);
    res.status(500).json({ error: "Failed to generate response" });
  }
});


app.listen(PORT, () => {
    connectDb();
  console.log(`Server is running on port ${PORT}`);
});