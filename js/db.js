"use strict";
import { createPool } from "mariadb";
const pool = createPool({
  host: "localhost",
  user: "awasUser",
  database: "awas_project",
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
    const row = await conn.query(`INSERT INTO users(Username, Password, IsAdmin) VALUES ("${username}", "${password}", false)`);
    console.log("row", row.insertId)
    const [user] = await conn.query('SELECT * FROM users WHERE id=?', [row.insertId]);
    console.log("user", user)
    return user
  } catch (e) {
    return e;
  }
}

const insertProduct = async (title, description, userId) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const row = await conn.query(`INSERT INTO products(ProductName, ProductDescription, UserId) VALUES ("${title}", "${description}", "${userId}")`);
    console.log("row", row.insertId)
    return "success";
  } catch (e) {
    return e;
  }
}

const getAllProducts = async () => {
  let conn;
  try {
    console.log('getAllproducts try');
    conn = await pool.getConnection();
    const row = await conn.query(`SELECT * FROM products`);
    console.log("getAllProducts row", row);
    return row;
  } catch (e) {
    return e;
  }
}

const deleteProduct = async (productId) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const row = await conn.query(`DELETE FROM products WHERE id = "${productId}"`);
    console.log("row", row.insertId)
    return "success";
  } catch (e) {
    return e;
  }
}

export { startDatabase, testQuery, loginQuery, registerQuery, insertProduct, getAllProducts, deleteProduct };
