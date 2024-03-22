import Product from "../model/product.model.js";

const allProducts = async (req, res) => {
  try {
    const Products = await Product.find({});
    res.status(200).json({
      success: true,
      message: "all-Product.",
      allProducts: Products,
      productsLength: Products.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "All Products Not fetched.",
      error: error.message,
    });
  }
};

const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("the product id =>", id);
    const product = await Product.findById(id);
    res.status(200).json({
      success: true,
      message: "Product found",
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Product Not fetched.",
      error: error.message,
    });
  }
};

const updatedProduct =async (req, res) => {
    try {
        const { id } = req.params;
        console.log("the product id =>", id);
        const updateProduct = await Product.findByIdAndUpdate(id, req.body);
        res.status(200).json({
          success: true,
          message: "Update Product found",
          updateProduct,
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: "Product Not updated.",
          error: error.message,
        });
      }
}

const deletedProduct = async (req, res) => {
    try {
        const { id } = req.params;
        console.log("the product id =>", id);
        const deleteProduct = await Product.findByIdAndUpdate(id, req.body);
        res.status(200).json({
          success: true,
          message: "Update Product found",
          deleteProduct,
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: "Product Not deleted.",
          error: error.message,
        });
      }
}

const createProduct = async (req, res) => {
    try {
        const blablabla = req.body.name;
        const existingProduct = await Product.findOne({name: blablabla}).exec();
        console.log("existing poduct =>", existingProduct);

    if (existingProduct?.name === blablabla) {
        return res.status(409).json({
        success: false,
        message: "Product already exists, choose another name or update the stock.",
          });
    }
        const product = await Product.create(req.body);
        res.status(201).json({
          success: true,
          message: "Product Created Successfully.",
          newProduct: product,
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: "Product Not Created.",
          error: error.message,
        });
      }
}

export { allProducts, getProduct, updatedProduct, deletedProduct, createProduct};