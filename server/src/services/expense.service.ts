import { db } from "../config/db"
import { addExpenseType, editExpenseType } from "../types/expense.types";

export const getExpenseService = async (date: Date): Promise<any> => {
    const query = await db.query("SELECT * FROM expenses WHERE expense_date=$1", [date]);
    return query.rows;
}

export const getExpenseByIdService = async (id: string): Promise<any> => {
    const query = await db.query("SELECT * FROM expenses WHERE id=$1", [id]);
    return query.rows;
}

export const addExpenseService = async ({ voucher, name, amount, date }: addExpenseType): Promise<void> => {
    await db.query("INSERT INTO expenses (voucher, expense_name, amount, expense_date) VALUES ($1, $2, $3, $4)", [voucher, name, amount, date]);
}

export const editExpenseService = async({ voucher, name, amount }: editExpenseType, id:string)  : Promise<void> => {
    await db.query("UPDATE expenses SET voucher=$1, expense_name=$2, amount=$3 WHERE id=$4", [voucher, name, amount, id]);
}

export const deleteExpenseService = async(id:string) : Promise<void> => {
    await db.query("DELETE FROM expenses WHERE id=$1", [id]);
}

export const dailyTotalExpenseService = async(date: Date) : Promise <any> => {
    const query = await db.query("SELECT SUM(amount) AS daily_total FROM expenses WHERE expense_date = $1", [date]);
    return query.rows;
}

export const dailyTotalByCategoryService = async (date: Date) : Promise <any> => {
    const query = await db.query(`
        SELECT 
            (enum_range(NULL::voucher_options))[i] as voucher,
            COALESCE((
                SELECT SUM(amount)
                FROM expenses 
                WHERE voucher = (enum_range(NULL::voucher_options))[i]
                AND expense_date = $1
            ), 0) as total_amount
        FROM generate_series(1, array_length(enum_range(NULL::voucher_options), 1)) i
        ORDER BY voucher`,
        [date]
    );
    return query.rows;
}

export const monthlyTotalByCategoryService = async ()  : Promise <any> => {
    const query = await db.query(`
        WITH date_series AS (
            SELECT 
                generate_series(
                    DATE_TRUNC('month', CURRENT_DATE),                   
                    DATE_TRUNC('month', CURRENT_DATE) + '1 month'::INTERVAL - '1 day'::INTERVAL,
                    INTERVAL '1 day'
                ) AS expense_date
            ),
        all_vouchers AS (
            SELECT unnest(ARRAY['hotel', 'room service', 'kitchen', 'auto expense', 'cash discount']::voucher_options[]) AS voucher
        )
        SELECT 
            ds.expense_date,
            av.voucher,
            COALESCE(SUM(e.amount), 0) AS total_amount
        FROM 
            date_series ds
        CROSS JOIN 
            all_vouchers av
        LEFT JOIN 
            expenses e
        ON 
            ds.expense_date = e.expense_date
            AND av.voucher = e.voucher
        GROUP BY ds.expense_date, av.voucher
        ORDER BY ds.expense_date, av.voucher`
    )
    return query.rows;
}

export const monthlyTotalExpenseService = async () : Promise<any> => {
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
            COALESCE(SUM(e.amount), 0) AS daily_total
        FROM 
            date_series ds
        LEFT JOIN 
            expenses e
        ON 
            ds.date = e.expense_date
        GROUP BY ds.date
        ORDER BY ds.date`
    )
    return  query.rows;
}