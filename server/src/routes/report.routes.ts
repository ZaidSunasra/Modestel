import express from 'express';
import { addReportController, deleteReportController, editReportController, getReportByIdController, getReportController } from '../controllers/report.controller';

export const reportRouter = express.Router();

reportRouter.get("/get", getReportController);
reportRouter.get("/get/:id", getReportByIdController);
reportRouter.post("/add", addReportController);
reportRouter.put("/edit/:id", editReportController);
reportRouter.delete("/delete/:id", deleteReportController);
