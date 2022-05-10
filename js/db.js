"use strict";
import { createPool } from "mariadb";
const pool = createPool({
  host: "localhost",
  user: "awasUser",
  password: "password1",
  connectionLimit: 5,
});

const startDatabase = async () => {
  let conn;
  try {
    conn = await pool.getConnection();
  } catch (err) {
    throw err;
  } finally {
    if (conn) return conn.end();
  }
};

const testQuery = async () => {
    let conn;
  try {
    conn = await pool.getConnection();
    await conn.query("USE awas_project");
    const users = await conn.query("SELECT * FROM users");
    console.log('users: ', users);
    return "success";
  } catch (error) {
    return error;
  }
};

export { startDatabase, testQuery };
