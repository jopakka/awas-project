import express from "express";
import { startDatabase, testQuery } from "./js/db";

// does this work?

const app = express();

app.listen(3000, async () => {
  console.log("App running on http://localhost:3000/");
  console.log("attempting to start mariadb: ", await startDatabase());
  console.log("attempting to fetch users: ", await testQuery());
});
