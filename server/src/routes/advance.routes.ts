import express from 'express';
import { addAdvanceController, dailyTotalAdvanceController, deleteAdvanceController, editAdvanceController, getAdvanceByIdController, getAdvanceByMonthController, getAdvanceController, monthlyTotalAdvanceController } from '../controllers/advance.controller';

export const advanceRouter = express.Router();

advanceRouter.get("/get", getAdvanceController);
advanceRouter.get("/get/:id", getAdvanceByIdController);
advanceRouter.post("/add", addAdvanceController);
advanceRouter.put("/edit/:id", editAdvanceController);
advanceRouter.delete("/delete/:id", deleteAdvanceController);
advanceRouter.get("/by-month", getAdvanceByMonthController);
advanceRouter.get("/daily-total", dailyTotalAdvanceController);
advanceRouter.get("/monthly-total", monthlyTotalAdvanceController)


