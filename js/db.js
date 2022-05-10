"use strict";
import { createPool } from "mariadb";
const pool = createPool({
  host: "localhost",
  user: "awasUser",
  database: "awas_project",
  password: "password1",
  connectionLimit: 5,
});

const testQuery = async () => {
  try {
    const users = await pool.query("SELECT * FROM users");
    console.log('users: ', users);
    return "success";
  } catch (error) {
    return error;
  }
};

const loginQuery = async (username) => {
  try {
    const [user] = await pool.query(`SELECT * FROM users WHERE Username="${username}"`);
    return user
  } catch (e) {
    return e;
  }
}

const registerQuery = async (username, password) => {
  try {
    const row = await pool.query(`INSERT INTO users(Username, Password, IsAdmin) VALUES ("${username}", "${password}", false)`);
    const [user] = await pool.query('SELECT * FROM users WHERE id=?', [row.insertId]);
    return user
  } catch (e) {
    return e;
  }
}

const insertProduct = async (title, description, userId) => {
  try {
    const row = await pool.query(`INSERT INTO products(ProductName, ProductDescription, UserId) VALUES ("${title}", "${description}", "${userId}")`);
    console.log("row", row)
    return row;
  } catch (e) {
    return e;
  }
}

const getAllProducts = async () => {
  try {
    const row = await pool.query(`SELECT * FROM products`);
    console.log("getAllProducts row", row);
    return row;
  } catch (e) {
    return e;
  }
}

const deleteProduct = async (productId) => {
  try {
    const row = await pool.query(`DELETE FROM products WHERE id = "${productId}"`);
    console.log("row", row.insertId)
    return "success";
  } catch (e) {
    return e;
  }
}

export { testQuery, loginQuery, registerQuery, insertProduct, getAllProducts, deleteProduct };
