import express from "express";
import { testQuery, insertProduct, getAllProducts } from "./js/db";
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
app.post(
  "/product",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    console.log("user", req.user);
    try {
      const product = await insertProduct(
        req.body.title,
        req.body.description,
        req.user.id
      );
      console.log("product: ", product);
    } catch (error) {}
    res.send("ok");
  }
);

app.post("/getAllProducts", async (req, res) => {
  try {
    const allProducts = await getAllProducts();
    console.log('allproducts: ', allProducts);
    res.json(allProducts);
  } catch (error) {}
});

app.use(express.static("./public"));

app.listen(3000, () => {
  console.log("App running on http://localhost:3000/");
  testQuery();
});
