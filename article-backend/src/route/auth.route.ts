import express from "express";
import {
  registerController,
  loginController,
  logoutController,
  updateProfileController,
} from "../controller/auth.controller";
import verifyAuth from "../middleware/authMiddleware";
import validate from "../middleware/validate";
import { registerSchema, loginSchema } from "../validator/auth.validator";

const router = express.Router();

router.post("/register", validate(registerSchema), registerController);
router.post("/login", validate(loginSchema), loginController);
router.get(
  "/profile",
  verifyAuth,
  (req: express.Request, res: express.Response) => {
    const user = (req as any).user;

    res.json({ message: "Success get profile", user });
  },
);
router.put(
  "/profile",
  verifyAuth,
  updateProfileController,
);
router.post("/logout", verifyAuth, logoutController);

export default router;
