import { db } from "../config/db";
import { addAdvanceType, editAdvanceType } from "../types/advance.types";

export const getAdvanceService = async (date: Date): Promise<any> => {
  const query = await db.query(
    "SELECT * FROM staff_advance_details WHERE date=$1",
    [date],
  );
  return query.rows;
};

export const getAdvanceByIdService = async (id: string): Promise<any> => {
  const query = await db.query(
    "SELECT * FROM staff_advance_details WHERE id=$1",
    [id],
  );
  return query.rows;
};

export const addAdvanceService = async ({
  name,
  amount,
  date,
}: addAdvanceType): Promise<void> => {
  await db.query(
    "INSERT INTO staff_advance_details (staff_name, amount, date) VALUES ($1, $2, $3)",
    [name, amount, date],
  );
};

export const editAdvanceService = async (
  { name, amount }: editAdvanceType,
  id: string,
): Promise<void> => {
  await db.query(
    "UPDATE staff_advance_details SET staff_name=$1, amount=$2 WHERE id=$3",
    [name, amount, id],
  );
};

export const deleteAdvanceService = async (id: string): Promise<void> => {
  await db.query("DELETE FROM staff_advance_details WHERE id=$1", [id]);
};

export const dailyTotalAdvanceService = async (date: Date): Promise<any> => {
  const query = await db.query(
    "SELECT COALESCE(SUM(amount),0) as daily_total FROM staff_advance_details WHERE date=$1",
    [date],
  );
  return query.rows;
};

export const monthlyTotalAdvanceService = async (
  year: number,
  month: number,
): Promise<any> => {
  const query = await db.query(`
        WITH date_series AS (
            SELECT 
                generate_series(
                    DATE_TRUNC('month', CURRENT_DATE),           
                    DATE_TRUNC('month', CURRENT_DATE) + '1 month'::INTERVAL - '1 day'::INTERVAL,
                    INTERVAL '1 day'
                ) AS date
            )
        SELECT 
            ds.date,
            COALESCE(SUM(r.amount), 0) AS daily_total
        FROM 
            date_series ds
        LEFT JOIN 
            staff_advance_details r
        ON 
            ds.date = r.DATE
        GROUP BY ds.date
        ORDER BY ds.date`);
  return query.rows;
};

export const getAdvanceByMonthService = async (
  year: number,
  month: number,
): Promise<any> => {
  const query = await db.query(
    "SELECT * FROM staff_advance_details WHERE EXTRACT (MONTH FROM date) = $1 AND EXTRACT (YEAR FROM date) = $2",
    [month, year],
  );
  return query.rows;
};
