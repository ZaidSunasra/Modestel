import express from 'express';
import { addSettlementController, deleteSettlementController, editSettlementController, getMonthlySettlementDayWiseController } from '../controllers/settlement.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { checkRole } from '../middlewares/role.middleware';

export const settlementRouter = express.Router();

settlementRouter.post("/add", authMiddleware, checkRole(['admin', 'user']), addSettlementController);
settlementRouter.put("/edit/:id", authMiddleware, checkRole(['admin', 'user']), editSettlementController);
settlementRouter.delete("/delete/:date", authMiddleware, checkRole(['admin', 'user']), deleteSettlementController);
settlementRouter.get("/monthly-total/day-wise", authMiddleware, checkRole(['admin', 'user']), getMonthlySettlementDayWiseController);


