import { db } from "../config/db";

export const dailyTotalCashService = async (date: Date): Promise<any> => {
  const query = await db.query(
    "SELECT SUM(total) as total_cash FROM reports WHERE payment_mode = 'cash' AND report_date = $1",
    [date],
  );
  return query.rows;
};

export const dailyTotalBySourceService = async (date: Date): Promise<any> => {
  const query = await db.query(
    "SELECT SUM(tariff) as total_tariff , SUM(c_gst) as total_cgst, SUM(s_gst) as total_sgst, SUM(food) as total_food, SUM(laundry) as total_laundry, SUM(extra) as extra, SUM(total) as grand_total FROM reports WHERE report_date=$1",
    [date],
  );
  return query.rows;
};

export const dailytotalByBookingModeService = async (
  date: Date,
): Promise<any> => {
  const query = await db.query(
    `
        SELECT 
            (enum_range(NULL::booking_options))[i] as booking_mode,
            COALESCE((SELECT SUM(total)
                FROM reports 
                WHERE booking_mode = (enum_range(NULL::booking_options))[i]
                AND DATE(report_date) = $1
            ), 0) as total_amount
        FROM generate_series(1, array_length(enum_range(NULL::booking_options), 1)) i
        ORDER BY booking_mode `,
    [date],
  );
  return query.rows;
};

export const dailyTotalByPaymentModeService = async (
  date: Date,
): Promise<any> => {
  const query = await db.query(
    `
        SELECT 
            (enum_range(NULL::payment_options))[i] as payment_mode,
            COALESCE((SELECT SUM(total)
                FROM reports
                WHERE payment_mode = (enum_range(NULL::payment_options))[i]
                AND DATE(report_date) = $1
            ), 0) as total_amount
        FROM generate_series(1, array_length(enum_range(NULL::payment_options), 1)) i
        ORDER BY payment_mode`,
    [date],
  );
  return query.rows;
};

export const monthlyTotalBySourceService = async (): Promise<any> => {
  const query = await db.query(`
        WITH date_series AS (
            SELECT date_trunc('day', date)::date AS report_date
            FROM generate_series(
                date_trunc('month', CURRENT_DATE)::date,
                (date_trunc('month', CURRENT_DATE) + interval '1 month - 1 day')::date,
                interval '1 day'
            ) date
        )
        SELECT 
            ds.report_date,
            COALESCE(SUM(r.tariff), 0) as total_tariff,
            COALESCE(SUM(r.c_gst), 0) as total_cgst,
            COALESCE(SUM(r.s_gst), 0) as total_sgst,
            COALESCE(SUM(r.laundry), 0) as total_laundry,
            COALESCE(SUM(r.food), 0) as total_food,
            COALESCE(SUM(r.extra), 0) as total_extra,
            COALESCE(SUM(r.total), 0) as grand_total
        FROM date_series ds
        LEFT JOIN reports r ON DATE(r.report_date) = ds.report_date
        GROUP BY ds.report_date
        ORDER BY ds.report_date`);
  return query.rows;
};

export const monthlyTotalByBookingModeService = async (): Promise<any> => {
  const query = await db.query(`
        WITH date_series AS (
            SELECT 
                generate_series(
                    DATE_TRUNC('month', CURRENT_DATE),
                    DATE_TRUNC('month', CURRENT_DATE) + '1 month'::INTERVAL - '1 day'::INTERVAL,
                    INTERVAL '1 day'
                ) AS report_date
            ),
            booking_modes AS (
                SELECT unnest(enum_range(NULL::booking_options)) AS booking_mode
            )
        SELECT 
            ds.report_date,
            bm.booking_mode,
            COALESCE(SUM(r.total), 0) as total_amount
        FROM 
            date_series ds
        CROSS JOIN 
            booking_modes bm
        LEFT JOIN 
            reports r ON DATE(r.report_date) = ds.report_date 
            AND r.booking_mode = bm.booking_mode
        GROUP BY ds.report_date, bm.booking_mode
        ORDER BY ds.report_date, booking_mode`);
  return query.rows;
};

export const monthlyTotalService = async (): Promise<any> => {
  const query = await db.query(`
        WITH date_series AS (
            SELECT 
                generate_series(
                    DATE_TRUNC('month',  CURRENT_DATE),         
                    DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '1 month' - INTERVAL '1 day', 
                    INTERVAL '1 day'
                ) AS expense_date
            )
        SELECT 
            ds.expense_date,
            COALESCE(SUM(r.total), 0) AS daily_total
        FROM 
            date_series ds
        LEFT JOIN 
            reports r
        ON 
            ds.expense_date = r.report_date
        GROUP BY ds.expense_date
        ORDER BY ds.expense_date`);
  return query.rows;
};

export const monthlyTotalCashService = async (): Promise<any> => {
  const query = await db.query(`
        WITH date_series AS (
            SELECT 
                generate_series(
                    DATE_TRUNC('month', CURRENT_DATE),          
                    DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '1 month' - INTERVAL '1 day',
                    INTERVAL '1 day'
                ) AS expense_date
            )           
        SELECT 
            ds.expense_date,
            COALESCE(SUM(r.total), 0) AS daily_cash_total
        FROM 
            date_series ds
        LEFT JOIN 
            reports r
        ON 
            ds.expense_date = r.report_date
            AND r.payment_mode = 'cash' 
        GROUP BY ds.expense_date
        ORDER BY ds.expense_date`);
  return query.rows;
};
