import express from "express";
import {
  registerController,
  loginController,
  logoutController,
} from "../controller/auth.controller";
import verifyAuth from "../middleware/authMiddleware";

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.get(
  "/profile",
  verifyAuth,
  (req: express.Request, res: express.Response) => {
    const user = (req as any).user;

    res.json({ message: "Success get profile", user });
  },
);
router.post("/logout", verifyAuth, logoutController);

export default router;
