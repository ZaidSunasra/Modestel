import { Response, Request } from "express";
import {
  addAdvanceService,
  dailyTotalAdvanceService,
  deleteAdvanceService,
  editAdvanceService,
  getAdvanceByIdService,
  getAdvanceByMonthService,
  getAdvanceService,
  monthlyTotalAdvanceService,
} from "../services/advance.service";
import {
  addAdvanceSchema,
  editAdvanceSchema,
} from "../validations/advance.validations";

export const getAdvanceController = async (
  req: Request,
  res: Response,
): Promise<any> => {
  const date = new Date();
  try {
    const response = await getAdvanceService(date);
    return res.status(200).json({
      advances: response,
    });
  } catch (error) {
    console.log("Error in getting advance: ", error);
    return res.status(500).send({
      msg: "Internal server error",
    });
  }
};

export const getAdvanceByIdController = async (
  req: Request,
  res: Response,
): Promise<any> => {
  const id = req.params.id;
  try {
    const response = await getAdvanceByIdService(id);
    return res.status(200).json({
      advance: response,
    });
  } catch (error) {
    console.log("Error in getting advance with ID: " + id + " " + error);
    return res.status(500).send({
      msg: "Internal server error",
    });
  }
};

export const addAdvanceController = async (
  req: Request,
  res: Response,
): Promise<any> => {
  const { name, amount, date } = req.body;
  const zodValidation = addAdvanceSchema.safeParse(req.body);
  if (!zodValidation.success) {
    return res.status(400).json({
      msg: "Incorrect data format",
      error: zodValidation.error.errors,
    });
  }
  try {
    await addAdvanceService({ name, amount, date });
    return res.status(201).json({
      msg: "Advance added successfully",
    });
  } catch (error) {
    console.log("Error in adding advance: ", error);
    return res.status(500).send({
      msg: "Internal server error",
    });
  }
};

export const editAdvanceController = async (
  req: Request,
  res: Response,
): Promise<any> => {
  const { name, amount } = req.body;
  const id = req.params.id;
  const zodValidation = editAdvanceSchema.safeParse(req.body);
  if (!zodValidation.success) {
    return res.status(400).json({
      msg: "Incorrect data format",
      error: zodValidation.error.errors,
    });
  }
  try {
    await editAdvanceService({ name, amount }, id);
    return res.status(201).json({
      msg: "Advance edited successfully",
    });
  } catch (error) {
    console.log("Error in editing advance: ", error);
    return res.status(500).send({
      msg: "Internal server error",
    });
  }
};

export const deleteAdvanceController = async (
  req: Request,
  res: Response,
): Promise<any> => {
  const id = req.params.id;
  try {
    await deleteAdvanceService(id);
    return res.status(201).json({
      msg: "Advance deleted successfully",
    });
  } catch (error) {
    console.log("Error in deleting advance: ", error);
    return res.status(500).send({
      msg: "Internal server error",
    });
  }
};

export const dailyTotalAdvanceController = async (
  req: Request,
  res: Response,
): Promise<any> => {
  const date = new Date();
  try {
    const response = await dailyTotalAdvanceService(date);
    return res.status(200).json({
      response,
    });
  } catch (error) {
    console.log("Error in getting total advance: ", error);
    return res.status(500).send({
      msg: "Internal server error",
    });
  }
};

export const monthlyTotalAdvanceController = async (
  req: Request,
  res: Response,
): Promise<any> => {
  const date = new Date();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  try {
    const response = await monthlyTotalAdvanceService(year, month);
    return res.status(200).json({
      response,
    });
  } catch (error) {
    console.log("Error in getting advance: ", error);
    return res.status(500).send({
      msg: "Internal server error",
    });
  }
};

export const getAdvanceByMonthController = async (
  req: Request,
  res: Response,
): Promise<any> => {
  const date = new Date();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  try {
    const response = await getAdvanceByMonthService(year, month);
    return res.status(200).json({
      response,
    });
  } catch (error) {
    console.log("Error in getting advance: ", error);
    return res.status(500).send({
      msg: "Internal server error",
    });
  }
};
