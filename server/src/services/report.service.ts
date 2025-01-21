import { db } from "../config/db";
import { addReportType, editReportType } from "../types/report.types";

export const addReportService = async ({
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
}: addReportType): Promise<void> => {
  await db.query(
    "INSERT INTO reports (room_no, bill_no, tariff, c_gst, s_gst, food, laundry, extra, total, booking_mode, payment_mode, report_date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)",
    [
      room_no,
      bill_no,
      tariff,
      c_gst,
      s_gst,
      food,
      laundry,
      extra,
      total,
      booking_mode,
      payment_mode,
      date,
    ],
  );
};

export const getReportService = async (date: Date): Promise<any> => {
  const query = await db.query("SELECT * FROM reports WHERE report_date=$1", [
    date,
  ]);
  return query.rows;
};

export const getReportByIdService = async (id: string): Promise<any> => {
  const query = await db.query("SELECT * FROM reports WHERE id=$1", [id]);
  return query.rows;
};

export const editReportService = async (
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
  }: editReportType,
  id: string,
): Promise<void> => {
  await db.query(
    "UPDATE reports SET room_no=$1, bill_no=$2, tariff = $3, c_gst = $4, s_gst = $5, food = $6, laundry = $7, extra = $8, total= $9, payment_mode=$10, booking_mode = $11 WHERE id = $12",
    [
      room_no,
      bill_no,
      tariff,
      c_gst,
      s_gst,
      food,
      laundry,
      extra,
      total,
      payment_mode,
      booking_mode,
      id,
    ],
  );
};

export const deleteReportService = async (id: string): Promise<void> => {
  await db.query("DELETE FROM reports WHERE id=$1", [id]);
};
