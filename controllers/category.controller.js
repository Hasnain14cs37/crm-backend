const Category = require("../models/category.model");

exports.create = async (req, res) => {
  const { name, description } = req.body;

  try {
    let category = await Category.findOne({
      name,
    });
    if (category) {
      return res.status(400).json({
        msg: "Category Already Exists",
      });
    }

    category = new Category({
      name,
      description,
    });

    await category.save();

    res.status(200).json({
      data: category,
      message: "Category created successfully!",
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Error in Saving");
  }
};

exports.index = async (req, res) => {
  try {
    let categories = await Category.find();

    res.status(200).json({
      data: categories,
      message: "Categories fetched successfully!",
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Error in Saving");
  }
};

exports.getSingle = async (req, res) => {
  try {
    let category = await Category.findById(req.params.id);

    res.status(200).json({
      data: category,
      message: "Single category fetched successfully!",
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send(err.message);
  }
};

exports.update = async (req, res) => {
  try {
    let updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        description: req.body.description
      },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).send({
        message: "Category not found with id " + req.params.id,
      });
    } else {
      res.status(200).json({
        data: updatedCategory,
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
    let category = await Category.findByIdAndRemove(req.params.id);
    if (!category) {
      return res.status(404).send({
        message: "Category not found with id " + req.params.id,
      });
    }
    res.send({ message: "Category deleted successfully!" });
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
};
