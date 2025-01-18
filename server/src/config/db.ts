import { Pool } from 'pg';
import env from 'dotenv';

env.config();

export const db = new Pool({
    user: 'postgres',
    database: 'Modestel',
    password: `${process.env.DATABASE_PASSWORD}`,
    host: 'localhost',
    port: 5432
});


//Database Schema

// CREATE TYPE payment_options AS ENUM('cash', 'card swipe','bank transfer', 'wallet', 'ota pay');
// CREATE TYPE booking_options AS ENUM('walking', 'ota', 'company', 'banquet', 'wastage', 'extra');
// CREATE TABLE reports (
// 	id BIGSERIAL PRIMARY KEY,
// 	room_no INTEGER NOT NULL,
// 	bill_no INTEGER NOT NULL,
// 	tariff NUMERIC(8,2) NOT NULL,
// 	c_gst NUMERIC(8,2) NOT NULL,
// 	s_gst NUMERIC(8,2) NOT NULL,
// 	food NUMERIC(8,2) NOT NULL,
// 	laundry NUMERIC(8,2) NOT NULL,
// 	extra NUMERIC(8,2) NOT NULL,
// 	total NUMERIC(9,2) NOT NULL,
// 	payment_mode payment_options NOT NULL,
// 	booking_mode booking_options NOT NULL,
// 	report_date DATE NOT NULL
// );

// CREATE TYPE voucher_options AS ENUM ('hotel', 'room service', 'kitchen', 'auto expense', 'cash discount');
// CREATE TABLE expenses (
// 	id BIGSERIAL PRIMARY KEY,
// 	voucher voucher_options NOT NULL,
// 	expense_name TEXT NOT NULL,
// 	amount NUMERIC(7,2) NOT NULL,
// 	date DATE NOT NULL
// );

// CREATE TABLE staff_advance_details (
// 	id BIGSERIAL PRIMARY KEY,
// 	staff_name TEXT NOT NULL,
// 	amount NUMERIC(8,2) NOT NULL,
// 	date DATE NOT NULL
// );

// CREATE INDEX idx_reports_date ON reports(report_date);
// CREATE INDEX idx_reports_date_payment_booking ON reports(report_date, payment_mode, booking_mode);
// CREATE INDEX idx_reports_date_sources ON reports(report_date, tariff, food, laundry, extra);
// CREATE INDEX idx_expenses_date_voucher ON expenses(expense_date, voucher);
// CREATE INDEX idx_staff_advance_date ON staff_advance_details(date);
