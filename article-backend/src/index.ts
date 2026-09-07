import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import authRouter from "./route/auth.route";
import articleRoute from "./route/article.route";
import { errorHandler } from "./middleware/errorHandler";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 8000;

const swaggerOptions: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Article Webpage API",
      version: "1.0.0",
      description: "Interactive API documentation for Authentication and Articles endpoints",
    },
  },
  apis: [
    "./src/route/*.ts",
    "./dist/route/*.js",
    "./src/docs/swagger/*.yaml",
  ],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
const swaggerUiOptions = {
  swaggerOptions: {
    supportedSubmitMethods: [],
  },
};
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs, swaggerUiOptions));
app.get("/api-docs.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerDocs);
});

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

app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: "Route not found",
  });
});

app.use(errorHandler);
app.listen(Number(PORT), "0.0.0.0", () =>
  console.log(`Server running on ${PORT}`),
);
