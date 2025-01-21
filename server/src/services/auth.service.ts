import { db } from "../config/db"
import { signupType } from "../types/auth.types";

export const findExistingUser = async(username: string) : Promise<any> => {
    const query = await db.query("SELECT * FROM users WHERE username=$1", [username]);
    return query.rows;
}

export const addNewUser = async({username, hashedPassword, role} : signupType) : Promise<void> => {
    await db.query("INSERT INTO users(username, password, role) VALUES ($1, $2, $3)", [username, hashedPassword, role]);
}