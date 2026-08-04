import express from "express";
import cors from "cors";
import morgan from "morgan";
import chatRouter from "./routes/chat";
import prequalifyRouter from "./routes/prequalify";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(
  morgan(process.env.NODE_ENV === "production" ? "combined" : "dev", {
    stream: process.stdout,
  })
);
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "cashew-capital-backend" });
});

app.use("/api/chat", chatRouter);
app.use("/api/prequalify", prequalifyRouter);

app.listen(PORT, () => {
  console.log(`Cashew Capital backend running on port ${PORT}`);
});
