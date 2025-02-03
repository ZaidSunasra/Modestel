import { db } from "../config/db"
import { addSettlementType, editSettlementType } from "../types/settlement.types";

export const addSettlementService = async ({ hotel, bank, date }: addSettlementType): Promise<void> => {
    await db.query("INSERT INTO settlements(bank, hotel, date) VALUES ($1, $2, $3)", [bank, hotel, date]);
}

export const editSettlementService = async ({ hotel, bank }: editSettlementType, id: string): Promise<void> => {
    await db.query("UPDATE settlements SET hotel=$1, bank=$2 WHERE id=$3", [hotel, bank, id]);
}

export const deleteSettlementService = async (date: string): Promise<void> => {
    await db.query("DELETE FROM settlements WHERE date=$1", [date]);
}

export const getMonthlySettlementDayWiseService = async (): Promise<any> => {
    const query = await db.query(`
       WITH date_series AS (
            SELECT generate_series(
                DATE_TRUNC('month', CURRENT_DATE), 
                DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '1 month' - INTERVAL '1 day',
                INTERVAL '1 day'
            )::DATE AS settlement_date
        )
        SELECT 
            ds.settlement_date, 
            COALESCE(SUM(s.hotel), 0) AS total_hotel, 
            COALESCE(SUM(s.bank), 0) AS total_bank
        FROM date_series ds
        LEFT JOIN settlements s ON ds.settlement_date = s.date
        GROUP BY ds.settlement_date
        ORDER BY ds.settlement_date;
    `);
    return query.rows;
}