const express = require("express");
const fileUpload = require("express-fileupload");
const InitiateMongoServer = require("./config/db");
const authRoutes = require("./routes/auth.routes");
const categoriesRoutes = require("./routes/categories.routes");
const subCategoriesRoutes = require("./routes/subcategory.routes");
const productsRoutes = require("./routes/products.routes");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(
  fileUpload({
    createParentPath: true,
  })
);

app.use(express.json());
InitiateMongoServer();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send({
    message: "Welcome to the beginning of nothingness",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/subCategories", subCategoriesRoutes);
app.use("/api/products", productsRoutes);

app.listen(5000, console.log("App is running on port 5000"));
