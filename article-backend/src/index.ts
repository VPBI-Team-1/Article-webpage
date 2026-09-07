import express from "express";
import authRouter from "./route/auth.route";
import articleRoute from "./route/article.route";
import { errorHandler } from "./middleware/errorHandler";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
const PORT = process.env.PORT;
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/articles", articleRoute);

app.use(errorHandler);
app.listen(Number(PORT), "0.0.0.0", () =>
  console.log(`Server running on ${PORT}`),
);
