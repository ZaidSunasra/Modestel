import express from "express";
import {
  addExpenseController,
  dailyTotalByCategoryController,
  dailyTotalExpenseController,
  deleteExpenseController,
  editExpenseController,
  getExpenseByIdController,
  getExpenseController,
  monthlyTotalByCategoryController,
  monthlyTotalExpenseController,
} from "../controllers/expense.controller";
import { checkRole } from "../middlewares/role.middleware";
import { authMiddleware } from "../middlewares/auth.middleware";

export const expenseRouter = express.Router();

expenseRouter.get(
  "/get",
  authMiddleware,
  checkRole(["admin", "receptionist", "user"]),
  getExpenseController,
);
expenseRouter.get(
  "/get/:id",
  authMiddleware,
  checkRole(["admin", "receptionist", "user"]),
  getExpenseByIdController,
);
expenseRouter.post(
  "/add",
  authMiddleware,
  checkRole(["admin", "receptionist", "user"]),
  addExpenseController,
);
expenseRouter.put(
  "/edit/:id",
  authMiddleware,
  checkRole(["admin", "receptionist", "user"]),
  editExpenseController,
);
expenseRouter.delete(
  "/delete/:id",
  authMiddleware,
  checkRole(["admin", "receptionist", "user"]),
  deleteExpenseController,
);
expenseRouter.get(
  "/daily-total",
  authMiddleware,
  checkRole(["admin", "receptionist", "user"]),
  dailyTotalExpenseController,
);
expenseRouter.get(
  "/daily-totals/by-category",
  authMiddleware,
  checkRole(["admin", "receptionist", "user"]),
  dailyTotalByCategoryController,
);
expenseRouter.get(
  "/monthly-totals/by-category",
  authMiddleware,
  checkRole(["admin", "user"]),
  monthlyTotalByCategoryController,
);
expenseRouter.get(
  "/monthly-total",
  authMiddleware,
  checkRole(["admin", "user"]),
  monthlyTotalExpenseController,
);
