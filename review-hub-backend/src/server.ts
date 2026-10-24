import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { toNodeHandler } from "better-auth/node"; // <-- Better Auth Node Handler
import { auth } from "./lib/auth"; // <-- আপনার auth.ts
import routes from "./routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (
      origin === (process.env.CLIENT_URL || "http://localhost:3000") ||
      origin.includes("localhost") ||
      origin.endsWith(".vercel.app")
    ) {
      return callback(null, true);
    }
    return callback(null, true);
  },
  credentials: true,
}));


app.all("/api/auth/*splat", toNodeHandler(auth));
app.use(express.json());


app.use("/api", routes);

app.get("/", (req, res) => {
  res.json({ message: "ReviewHub Backend Server is running smoothly!" });
});

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

export default app;
