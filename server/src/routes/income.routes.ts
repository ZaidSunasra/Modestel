import express from 'express';
import { dailyTotalByBookingModeController, dailyTotalByPaymentModeController, dailyTotalBySourceController, dailyTotalCashController, monthlyTotalByBookingModeController, monthlyTotalBySourceController, monthlyTotalCashContoller, monthlyTotalController } from '../controllers/income.controller';

export const incomeRouter = express.Router();

incomeRouter.get("/daily-total/cash", dailyTotalCashController);
incomeRouter.get("/daily-totals/by-source", dailyTotalBySourceController);
incomeRouter.get("/daily-totals/by-booking-mode", dailyTotalByBookingModeController);
incomeRouter.get("/daily-totals/by-payment-mode", dailyTotalByPaymentModeController);
incomeRouter.get("/monthly-totals/by-source", monthlyTotalBySourceController);
incomeRouter.get("/monthly-totals/by-booking-mode", monthlyTotalByBookingModeController);
incomeRouter.get("/monthly-total", monthlyTotalController);
incomeRouter.get("/monthly-total/cash", monthlyTotalCashContoller);