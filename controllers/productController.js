import product from '../models/Product.js';
import {StatusCodes} from 'http-status-codes';
import CustomAPIError from "../errors/custom-api.js";
import authUtils from "../utils/index.js";


const createProduct = async (req, res) => {
  req.body.user= req.user.userId;
  const product = await product.create(req.body);
  res.status(StatusCodes.CREATED).json({product});
};

const getAllProducts = async (req, res) => {
  res.send("get all products");
};

const getSingleProduct = async (req, res) => {
  res.send("get single product");
};

const updateProduct = async (req, res) => {
  res.send("update product");
};

const deleteProduct = async (req, res) => {
  res.send("delete product");
};

const uploadImage = async (req, res) => {
  res.send("upload image");
};

export default {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
};
