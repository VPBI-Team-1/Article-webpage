import express from "express";
import authRouter from "./route/auth.route";
import { errorHandler } from "./middleware/errorHandler";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT;
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);

app.use(errorHandler);
app.listen(Number(PORT), "0.0.0.0", () =>
  console.log(`Server running on ${PORT}`),
);
