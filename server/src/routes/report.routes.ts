import express from "express";
import {
  addReportController,
  deleteReportController,
  editReportController,
  getReportByIdController,
  getReportController,
} from "../controllers/report.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { checkRole } from "../middlewares/role.middleware";

export const reportRouter = express.Router();

reportRouter.get(
  "/get",
  authMiddleware,
  checkRole(["admin", "receptionist", "user"]),
  getReportController,
);
reportRouter.get(
  "/get/:id",
  authMiddleware,
  checkRole(["admin", "receptionist", "user"]),
  getReportByIdController,
);
reportRouter.post(
  "/add",
  authMiddleware,
  checkRole(["admin", "receptionist", "user"]),
  addReportController,
);
reportRouter.put(
  "/edit/:id",
  authMiddleware,
  checkRole(["admin", "receptionist", "user"]),
  editReportController,
);
reportRouter.delete(
  "/delete/:id",
  authMiddleware,
  checkRole(["admin", "receptionist", "user"]),
  deleteReportController,
);
