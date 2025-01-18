import { Request, Response } from "express"
import { addExpenseService, dailyTotalByCategoryService, dailyTotalExpenseService, deleteExpenseService, editExpenseService, getExpenseByIdService, getExpenseService, monthlyTotalByCategoryService, monthlyTotalExpenseService } from "../services/expense.service";
import { addExpenseSchema, editExpenseSchema } from "../validations/expense.validation";

export const getExpenseController = async (req: Request, res: Response): Promise<any> => {
    const date = new Date();
    try {
        const response = await getExpenseService(date);
        return res.status(200).json({
            expenses: response,
        });
    } catch (error) {
        console.log("Error in getting expense: ", error);
        return res.status(500).send({
            msg: "Internal server error",
        });
    }
}

export const getExpenseByIdController = async (req: Request, res: Response): Promise<any> => {
    const id = req.params.id;
    try {
        const response = await getExpenseByIdService(id);
        return res.status(200).json({
            expense: response,
        });
    } catch (error) {
        console.log("Error in getting expense with ID: " + id + " " + error);
        return res.status(500).send({
            msg: "Internal server error",
        });
    }
}

export const addExpenseController = async (req: Request, res: Response): Promise<any> => {
    const { voucher, name, amount, date } = req.body;
    const zodValidation = addExpenseSchema.safeParse(req.body);
    if (!zodValidation.success) {
        return res.status(400).json({
            msg: "Incorrect data format",
            error: zodValidation.error.errors,
        });
    }
    try {
        await addExpenseService({ voucher, name, amount, date });
        return res.status(201).json({
            msg: "Expense added successfully",
        });
    } catch (error) {
        console.log("Error in adding expense: ", error);
        return res.status(500).send({
            msg: "Internal server error",
        });
    }
}

export const editExpenseController = async (req: Request, res: Response): Promise<any> => {
    const { voucher, name, amount } = req.body;
    const id = req.params.id;
    const zodValidation = editExpenseSchema.safeParse(req.body);
    if (!zodValidation.success) {
        return res.status(400).json({
            msg: "Incorrect data format",
            error: zodValidation.error.errors,
        });
    }
    try {
        await editExpenseService({ voucher, name, amount }, id);
        return res.status(201).json({
            msg: "Expense edited successfully",
        });
    } catch (error) {
        console.log("Error in editing expense: ", error);
        return res.status(500).send({
            msg: "Internal server error",
        });
    }
}

export const deleteExpenseController = async (req: Request, res: Response): Promise<any> => {
    const id = req.params.id;
    try {
        await deleteExpenseService(id);
        return res.status(201).json({
            msg: "Expense deleted successfully",
        });
    } catch (error) {
        console.log("Error in deleting expense: ", error);
        return res.status(500).send({
            msg: "Internal server error",
        });
    }
}

export const dailyTotalExpenseController = async (req: Request, res: Response): Promise<any> => {
    const date = new Date();
    try {
        const response = await dailyTotalExpenseService(date);
        return res.status(200).json({
            response,
        });
    } catch (error) {
        console.log("Error in getting daily total expense." + " " + error);
        return res.status(500).send({
            msg: "Internal server error",
        });
    }
}

export const dailyTotalByCategoryController = async (req: Request, res: Response): Promise<any> => {
    const date = new Date();
    try {
        const response = await dailyTotalByCategoryService(date);
        return res.status(200).json({
            response,
        });
    } catch (error) {
        console.log("Error in getting daily total expense by category" + " " + error);
        return res.status(500).send({
            msg: "Internal server error",
        });
    }
}

export const monthlyTotalByCategoryController = async (req: Request, res: Response): Promise<any> => {
    try {
        const response = await monthlyTotalByCategoryService();
        return res.status(200).json({
            response,
        });
    } catch (error) {
        console.log("Error in getting monthly total expense by category" + " " + error);
        return res.status(500).send({
            msg: "Internal server error",
        });
    }
}

export const monthlyTotalExpenseController = async (req: Request, res: Response): Promise<any> => {
    try {
        const response = await monthlyTotalExpenseService();
        return res.status(200).json({
            response,
        });
    } catch (error) {
        console.log("Error in getting monthly total expense" + " " + error);
        return res.status(500).send({
            msg: "Internal server error",
        });
    }
} 