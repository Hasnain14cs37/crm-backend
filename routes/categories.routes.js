const express = require("express");
const router = express.Router();
const categoriesController = require("../controllers/category.controller");

router.post("/create", categoriesController.create);
router.get("/index", categoriesController.index);
router.get("/getSingle/:id", categoriesController.getSingle);
router.put("/update/:id", categoriesController.update);
router.delete("/delete/:id", categoriesController.delete);

module.exports = router;
