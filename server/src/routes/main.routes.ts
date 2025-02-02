import express from "express";
import { reportRouter } from "./report.routes";
import { expenseRouter } from "./expense.routes";
import { advanceRouter } from "./advance.routes";
import { incomeRouter } from "./income.routes";
import { authRouter } from "./auth.routes";
import { settlementRouter } from "./settlement.routes";

export const router = express.Router();

router.use("/report", reportRouter);
router.use("/expense", expenseRouter);
router.use("/advance", advanceRouter);
router.use("/income", incomeRouter);
router.use("/auth", authRouter);
router.use("/settlement", settlementRouter);