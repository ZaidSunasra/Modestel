import express from "express";
import {
  addAdvanceController,
  dailyTotalAdvanceController,
  deleteAdvanceController,
  editAdvanceController,
  getAdvanceByIdController,
  getAdvanceByMonthController,
  getAdvanceController,
  monthlyTotalAdvanceController,
} from "../controllers/advance.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { checkRole } from "../middlewares/role.middleware";

export const advanceRouter = express.Router();

advanceRouter.get(
  "/get",
  authMiddleware,
  checkRole(["admin", "receptionist", "user"]),
  getAdvanceController,
);
advanceRouter.get(
  "/get/:id",
  authMiddleware,
  checkRole(["admin", "receptionist", "user"]),
  getAdvanceByIdController,
);
advanceRouter.post(
  "/add",
  authMiddleware,
  checkRole(["admin", "receptionist", "user"]),
  addAdvanceController,
);
advanceRouter.put(
  "/edit/:id",
  authMiddleware,
  checkRole(["admin", "receptionist", "user"]),
  editAdvanceController,
);
advanceRouter.delete(
  "/delete/:id",
  authMiddleware,
  checkRole(["admin", "receptionist", "user"]),
  deleteAdvanceController,
);
advanceRouter.get(
  "/by-month",
  authMiddleware,
  checkRole(["admin", "user"]),
  getAdvanceByMonthController,
);
advanceRouter.get(
  "/daily-total",
  authMiddleware,
  checkRole(["admin", "user"]),
  dailyTotalAdvanceController,
);
advanceRouter.get(
  "/monthly-total",
  authMiddleware,
  checkRole(["admin", "user"]),
  monthlyTotalAdvanceController,
);
