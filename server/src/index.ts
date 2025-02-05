import express from "express";
import cors from "cors";
import { router as mainRouter } from "./routes/main.routes";
import env from "dotenv";
import path from "path";

const app = express();
env.config({ path: path.join(__dirname, ".env") });

app.use(
  cors({
    origin: ["http://localhost:1420", "http://tauri.localhost"],
    credentials: true,
  }),
);

app.use(express.json());
app.use("/api/v1", mainRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server running on Port: ${process.env.PORT}`);
});
