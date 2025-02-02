import express from "express";
import {
  addUserController,
  deleteAccountController,
  getAllUserController,
  loginController,
  logoutController,
} from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { checkRole } from "../middlewares/role.middleware";

export const authRouter = express.Router();

authRouter.post("/add-user", addUserController);
authRouter.post("/login", loginController);
authRouter.post("/logout", authMiddleware, logoutController);
authRouter.delete("/delete-account/:id", authMiddleware, checkRole(['admin', 'user']), deleteAccountController);
authRouter.get("/get/all-user", authMiddleware, checkRole(['admin', 'user']), getAllUserController);
