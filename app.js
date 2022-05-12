import express from "express";
import { insertProduct, getAllProducts, deleteProductById } from "./js/db";
import passport from "./utils/pass";
import authRoute from "./routes/authRoute";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(cookieParser());

app.post("/db", async (req, res) => {

});

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
      const newProduct = JSON.stringify(product, (_, v) => typeof v === 'bigint' ? v.toString() : v)
      const obj = JSON.parse(newProduct)
      res.json(obj)
    } catch (error) {
      res.status(400).json({message: "Insert error", error: error.message})
    }
  }
);

app.post("/getAllProducts", async (req, res) => {
  try {
    const allProducts = await getAllProducts();
    console.log('allproducts: ', allProducts);
    res.json(allProducts);
  } catch (error) {
    console.error("get all products error: ", error.message);
  }
});

app.post("/deleteProductById", async (req, res) => {
  try {
    const product = await deleteProductById(req.body.id);
    console.log('deleted product ', product);

    const newDeletedProduct = JSON.stringify(product, (_, v) => typeof v === 'bigint' ? v.toString() : v)
    const obj = JSON.parse(newDeletedProduct)

    res.json(obj);
  } catch (error) {
    console.error("delete product error: ", error.message);
  }
});

app.use(express.static("./public"));

app.listen(3000, () => {
  console.log("App running on http://localhost:3000/");
});
