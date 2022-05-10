import express from "express";
import { testQuery } from "./js/db";
import passport from "./utils/pass";
import authRoute from "./routes/authRoute";
import cookieParser from "cookie-parser";
import path from "path";

const app = express();
app.use(express.json());
app.use(cookieParser());

app.get(
  "/secret*",
  passport.authenticate("jwt", {
    session: false,
    failureRedirect: "/login.html",
  }),
  (req, res) => {
    res.sendFile(path.join(__dirname, "public/secret.html"));
  }
);

app.use("/auth", authRoute);

app.use(express.static("./public"));

app.listen(3000, () => {
  console.log("App running on http://localhost:3000/");
  testQuery();
});
