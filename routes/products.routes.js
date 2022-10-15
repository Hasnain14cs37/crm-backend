const express = require("express");
const router = express.Router();
const products = require("../controllers/products.controller");

router.post("/create", products.create);
router.get("/index", products.index);
router.get("/getSingle/:id", products.getSingle);
router.put("/update/:id", products.update);
router.delete("/delete/:id", products.delete);
module.exports = router;
