import { addSettlementService, deleteSettlementService, editSettlementService, getMonthlySettlementDayWiseService } from "../services/settlement.service";
import { addSettlementSchema, editSettlementSchema } from "../validations/settlement.validation";
import { Request, Response } from "express";

export const addSettlementController = async (req: Request, res: Response): Promise<any> => {
    const { date, hotel, bank } = req.body;
    const zodValidation = addSettlementSchema.safeParse(req.body);
    if (!zodValidation.success) {
        return res.status(400).json({
            msg: "Incorrect data format",
            error: zodValidation.error.errors,
        });
    }
    try {
        await addSettlementService({ hotel, bank, date });
        return res.status(201).json({
            msg: "Settlement added successfully",
        });
    } catch (error) {
        console.log("Error in adding settlement: ", error);
        return res.status(500).send({
            msg: "Internal server error",
        });
    }
};

export const editSettlementController = async (req: Request, res: Response) : Promise<any>=> {
    const id = req.params.id;
    const {hotel, bank} = req.body;
    const zodValidation = editSettlementSchema.safeParse(req.body);
    if (!zodValidation.success) {
        return res.status(400).json({
            msg: "Incorrect data format",
            error: zodValidation.error.errors,
        });
    }
    try {
        await editSettlementService({ hotel, bank }, id);
        return res.status(201).json({
            msg: "Settlement edited successfully",
        });
    } catch (error) {
        console.log("Error in editing settlement: ", error);
        return res.status(500).send({
            msg: "Internal server error",
        });
    }
}

export const deleteSettlementController = async(req: Request, res: Response) : Promise<any> => {
    const id = req.params.id;
    try {
        await deleteSettlementService(id);
        return res.status(201).json({
            msg: "Settlement deleted successfully",
        });
    } catch (error) {
        console.log("Error in deleting settlement: ", error);
        return res.status(500).send({
            msg: "Internal server error",
        });
    }
}

export const getMonthlySettlementDayWiseController = async (req: Request, res:Response)  :Promise<any> => {
    try {
        const response = await getMonthlySettlementDayWiseService();
        return res.status(201).json({
          response
        });
    } catch (error) {
        console.log("Error in getting monthly settlement: ", error);
        return res.status(500).send({
            msg: "Internal server error",
        });
    }
}

