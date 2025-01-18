import  express  from "express";
import { addExpenseController, dailyTotalByCategoryController, dailyTotalExpenseController, deleteExpenseController, editExpenseController, getExpenseByIdController, getExpenseController, monthlyTotalByCategoryController, monthlyTotalExpenseController } from "../controllers/expense.controller";

export const expenseRouter = express.Router();

expenseRouter.get("/get", getExpenseController);
expenseRouter.get("/get/:id", getExpenseByIdController);
expenseRouter.post("/add", addExpenseController);
expenseRouter.put("/edit/:id", editExpenseController);
expenseRouter.delete("/delete/:id", deleteExpenseController);
expenseRouter.get("/daily-total",dailyTotalExpenseController);
expenseRouter.get("/daily-totals/by-category",dailyTotalByCategoryController);
expenseRouter.get("/monthly-totals/by-category", monthlyTotalByCategoryController);
expenseRouter.get("/monthly-total", monthlyTotalExpenseController);