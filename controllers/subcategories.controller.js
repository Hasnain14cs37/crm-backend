const SubCategory = require("../models/subcategory.model");

exports.create = async (req, res) => {
  const { name, description } = req.body;

  try {
    const subCategory = new SubCategory({
      name,
      description,
      category: req.body.category,
    });
    const newsubcategory = await subCategory.save();
    res.status(200).json({
      message: "Sub Category created successfully!",
      date: newsubcategory,
    });
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
};

exports.index = async (req, res) => {
  try {
    const subcategories = await SubCategory.find().populate("category");
    res.status(200).json({
      message: "Sub Categories fetched succesfully! ",
      data: subcategories,
    });
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
};

exports.getSingle = async (req, res) => {
  try {
    let subcategory = await SubCategory.findById(req.params.id);

    res.status(200).json({
      data: subcategory,
      message: "Single sub category fetched successfully!",
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send(err.message);
  }
};

exports.update = async (req, res) => {
  try {
    let updatedsubcategory = await SubCategory.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
      },
      { new: true }
    );

    if (!updatedsubcategory) {
      return res.status(404).send({
        message: "Sub category not found with id " + req.params.id,
      });
    } else {
      res.status(200).json({
        data: updatedsubcategory,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({
      error: err.message,
    });
  }
};

exports.delete = async (req, res) => {
  try {
    let subcategory = await SubCategory.findByIdAndRemove(req.params.id);
    if (!subcategory) {
      return res.status(404).send({
        message: "Sub category not found with id " + req.params.id,
      });
    }
    res.send({ message: "Sub category deleted successfully!" });
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
};

exports.getSubCatgoriesOfCatgory = async (req, res) => {
  try {
    let subCategories = await SubCategory.find({ category: req.params.id });

    res.status(200).json({
      data: subCategories,
      message: "Sub categories of category fetched successfully!",
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send(err.message);
  }
};
