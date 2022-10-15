const express = require("express");
const router = express.Router();
const subCategoriesController = require("../controllers/subcategories.controller");

router.post("/create", subCategoriesController.create);
router.get("/index", subCategoriesController.index);
router.get("/getSingle/:id", subCategoriesController.getSingle);
router.put("/update/:id", subCategoriesController.update);
router.delete("/delete/:id", subCategoriesController.delete);
router.get(
  "/getSubCatgoriesOfCatgory/:id",
  subCategoriesController.getSubCatgoriesOfCatgory
);

module.exports = router;
