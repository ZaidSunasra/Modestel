import express from "express";
import {
  dailyTotalByBookingModeController,
  dailyTotalByPaymentModeController,
  dailyTotalBySourceController,
  dailyTotalCashController,
  monthlyTotalByBookingModeController,
  monthlyTotalBySourceController,
  monthlyTotalCashContoller,
  monthlyTotalController,
} from "../controllers/income.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { checkRole } from "../middlewares/role.middleware";

export const incomeRouter = express.Router();

incomeRouter.get(
  "/daily-total/cash",
  authMiddleware,
  checkRole(["admin", "receptionist", "user"]),
  dailyTotalCashController,
);
incomeRouter.get(
  "/daily-totals/by-source",
  authMiddleware,
  checkRole(["admin", "receptionist", "user"]),
  dailyTotalBySourceController,
);
incomeRouter.get(
  "/daily-totals/by-booking-mode",
  authMiddleware,
  checkRole(["admin", "receptionist", "user"]),
  dailyTotalByBookingModeController,
);
incomeRouter.get(
  "/daily-totals/by-payment-mode",
  authMiddleware,
  checkRole(["admin", "receptionist", "user"]),
  dailyTotalByPaymentModeController,
);
incomeRouter.get(
  "/monthly-totals/by-source",
  authMiddleware,
  checkRole(["admin", "user"]),
  monthlyTotalBySourceController,
);
incomeRouter.get(
  "/monthly-totals/by-booking-mode",
  authMiddleware,
  checkRole(["admin", "user"]),
  monthlyTotalByBookingModeController,
);
incomeRouter.get(
  "/monthly-total",
  authMiddleware,
  checkRole(["admin", "user"]),
  monthlyTotalController,
);
incomeRouter.get(
  "/monthly-total/cash",
  authMiddleware,
  checkRole(["admin", "user"]),
  monthlyTotalCashContoller,
);
