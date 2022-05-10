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

const loginQuery = async (username) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const [user] = await conn.query(`SELECT * FROM users WHERE Username="${username}"`);
    return user
  } catch (e) {
    return e;
  }
}

const registerQuery = async (username, password) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const [user] = await conn.query(`INSERT INTO users(Username, Password, IsAdmin) VALUES ("${username}", "${password}", false)`)
    return user
  } catch (e) {
    return e;
  }
}

export { startDatabase, testQuery, loginQuery, registerQuery };
