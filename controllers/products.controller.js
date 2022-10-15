const Product = require("../models/products.model");

exports.create = async (req, res) => {
  const { name, description, price, quantity } = req.body;
  try {
    image = req.files.file;
    image.mv("./uploads/" + image.name);

    const product = new Product({
      name,
      description,
      category: req.body.category,
      subcategory: req.body.subcategory,
      image: image.name,
      price,
      quantity,
    });
    const newProduct = await product.save();
    res.status(200).json({
      message: "Product created successfully!",
      date: newProduct,
    });
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
};

exports.index = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("category")
      .populate("subcategory");
    res.status(200).json({
      message: "Product fetched succesfully! ",
      data: products,
    });
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
};

exports.getSingle = async (req, res) => {
  try {
    let newProduct = await Product.findById(req.params.id);

    res.status(200).json({
      data: newProduct,
      message: "Single product fetched successfully!",
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send(err.message);
  }
};

exports.update = async (req, res) => {
  try {
    let updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        description: req.body.description,
      },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).send({
        message: "Product not found with id " + req.params.id,
      });
    } else {
      res.status(200).json({
        data: updatedProduct,
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
    let newProduct = await Product.findByIdAndRemove(req.params.id);
    if (!newProduct) {
      return res.status(404).send({
        message: "Product not found with id " + req.params.id,
      });
    }
    res.send({ message: "Product deleted successfully!" });
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
};
