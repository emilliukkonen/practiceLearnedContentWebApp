import { sql } from "../database/database.js";

const addUser = async (email, is_admin, password) => {
  await sql`INSERT INTO users (email, admin, password) VALUES (${email}, ${is_admin}, ${password})`;
};

const findUserByEmail = async (email) => {
    const rows = await sql`SELECT * FROM users WHERE email = ${email}`;
    return rows;
};

const getUser = async (id) => {
    const [currentUser] = await sql`SELECT * FROM users WHERE id = ${id}`;
    return currentUser;
};

export { addUser, findUserByEmail, getUser };