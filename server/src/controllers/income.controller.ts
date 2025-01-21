import { Response, Request } from "express";
import {
  dailytotalByBookingModeService,
  dailyTotalByPaymentModeService,
  dailyTotalBySourceService,
  dailyTotalCashService,
  monthlyTotalByBookingModeService,
  monthlyTotalBySourceService,
  monthlyTotalCashService,
  monthlyTotalService,
} from "../services/income.service";

export const dailyTotalCashController = async (
  req: Request,
  res: Response,
): Promise<any> => {
  const date = new Date();
  try {
    const response = await dailyTotalCashService(date);
    return res.status(200).json({
      response,
    });
  } catch (error) {
    console.log("Error in getting total cash: ", error);
    return res.status(500).send({
      msg: "Internal server error",
    });
  }
};

export const dailyTotalBySourceController = async (
  req: Request,
  res: Response,
): Promise<any> => {
  const date = new Date();
  try {
    const response = await dailyTotalBySourceService(date);
    return res.status(200).json({
      response,
    });
  } catch (error) {
    console.log("Error in getting total cash by sources: ", error);
    return res.status(500).send({
      msg: "Internal server error",
    });
  }
};

export const dailyTotalByBookingModeController = async (
  req: Request,
  res: Response,
): Promise<any> => {
  const date = new Date();
  try {
    const response = await dailytotalByBookingModeService(date);
    return res.status(200).json({
      response,
    });
  } catch (error) {
    console.log("Error in getting total cash by booking type: ", error);
    return res.status(500).send({
      msg: "Internal server error",
    });
  }
};

export const dailyTotalByPaymentModeController = async (
  req: Request,
  res: Response,
): Promise<any> => {
  const date = new Date();
  try {
    const response = await dailyTotalByPaymentModeService(date);
    return res.status(200).json({
      response,
    });
  } catch (error) {
    console.log("Error in getting total cash by payment type: ", error);
    return res.status(500).send({
      msg: "Internal server error",
    });
  }
};

export const monthlyTotalBySourceController = async (
  req: Request,
  res: Response,
): Promise<any> => {
  try {
    const response = await monthlyTotalBySourceService();
    return res.status(200).json({
      response,
    });
  } catch (error) {
    console.log("Error in getting monthly total cash by source: ", error);
    return res.status(500).send({
      msg: "Internal server error",
    });
  }
};

export const monthlyTotalByBookingModeController = async (
  req: Request,
  res: Response,
): Promise<any> => {
  try {
    const response = await monthlyTotalByBookingModeService();
    return res.status(200).json({
      response,
    });
  } catch (error) {
    console.log("Error in getting monthly total cash by booking type: ", error);
    return res.status(500).send({
      msg: "Internal server error",
    });
  }
};

export const monthlyTotalController = async (
  req: Request,
  res: Response,
): Promise<any> => {
  try {
    const response = await monthlyTotalService();
    return res.status(200).json({
      response,
    });
  } catch (error) {
    console.log("Error in getting monthly total income:", error);
    return res.status(500).send({
      msg: "Internal server error",
    });
  }
};

export const monthlyTotalCashContoller = async (
  req: Request,
  res: Response,
): Promise<any> => {
  try {
    const response = await monthlyTotalCashService();
    return res.status(200).json({
      response,
    });
  } catch (error) {
    console.log("Error in getting monthly total cash:", error);
    return res.status(500).send({
      msg: "Internal server error",
    });
  }
};
