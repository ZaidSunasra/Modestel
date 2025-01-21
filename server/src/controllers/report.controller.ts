import { Request, Response } from "express";
import {
  addReportSchema,
  editReportSchema,
} from "../validations/report.validation";
import {
  addReportService,
  deleteReportService,
  editReportService,
  getReportByIdService,
  getReportService,
} from "../services/report.service";

export const addReportController = async (
  req: Request,
  res: Response,
): Promise<any> => {
  const {
    room_no,
    bill_no,
    tariff,
    s_gst,
    c_gst,
    food,
    laundry,
    extra,
    total,
    payment_mode,
    booking_mode,
    date,
  } = req.body;
  const zodValidation = addReportSchema.safeParse(req.body);
  if (!zodValidation.success) {
    return res.status(400).json({
      msg: "Incorrect data format",
      error: zodValidation.error.errors,
    });
  }
  try {
    await addReportService({
      room_no,
      bill_no,
      tariff,
      s_gst,
      c_gst,
      food,
      laundry,
      extra,
      total,
      payment_mode,
      booking_mode,
      date,
    });
    return res.status(201).json({
      msg: "Report added successfully",
    });
  } catch (error) {
    console.log("Error in adding report: ", error);
    return res.status(500).send({
      msg: "Internal server error",
    });
  }
};

export const getReportController = async (
  req: Request,
  res: Response,
): Promise<any> => {
  const date = new Date();
  try {
    const response = await getReportService(date);
    return res.status(200).json({
      reports: response,
    });
  } catch (error) {
    console.log("Error in getting reports: ", error);
    return res.status(500).send({
      msg: "Internal server error",
    });
  }
};

export const getReportByIdController = async (
  req: Request,
  res: Response,
): Promise<any> => {
  const id = req.params.id;
  try {
    const response = await getReportByIdService(id);
    return res.status(200).json({
      report: response,
    });
  } catch (error) {
    console.log("Error in getting report with ID: " + id + " " + error);
    return res.status(500).send({
      msg: "Internal server error",
    });
  }
};

export const editReportController = async (
  req: Request,
  res: Response,
): Promise<any> => {
  const {
    room_no,
    bill_no,
    tariff,
    s_gst,
    c_gst,
    food,
    laundry,
    extra,
    total,
    payment_mode,
    booking_mode,
  } = req.body;
  const id = req.params.id;
  const zodValidation = editReportSchema.safeParse(req.body);
  if (!zodValidation.success) {
    return res.status(400).json({
      msg: "Incorrect data format",
      error: zodValidation.error.errors,
    });
  }
  try {
    await editReportService(
      {
        room_no,
        bill_no,
        tariff,
        s_gst,
        c_gst,
        food,
        laundry,
        extra,
        total,
        payment_mode,
        booking_mode,
      },
      id,
    );
    return res.status(201).json({
      msg: "Report edited successfully",
    });
  } catch (error) {
    console.log("Error in editing report: ", error);
    return res.status(500).send({
      msg: "Internal server error",
    });
  }
};

export const deleteReportController = async (
  req: Request,
  res: Response,
): Promise<any> => {
  const id = req.params.id;
  try {
    await deleteReportService(id);
    return res.status(201).json({
      msg: "Report deleted successfully",
    });
  } catch (error) {
    console.log("Error in deleting report: ", error);
    return res.status(500).send({
      msg: "Internal server error",
    });
  }
};
