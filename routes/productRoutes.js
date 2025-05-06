import express from "express";
import productController from "../controllers/productController.js";
import authenticate from "../middleware/authentication.js";
const router = express.Router();

router
  .route("/")
  .post(
    [authenticate.authenticateUser, authenticate.authorizePermissions("admin")],
    productController.createProduct
  )
  .get(productController.getAllProducts);

router
  .route("/uploadImage")
  .post(
    [authenticate.authenticateUser, authenticate.authorizePermissions],
    productController.uploadImage
  );

router
  .route("/:id")
  .get(productController.getSingleProduct)
  .patch(
    [authenticate.authenticateUser, authenticate.authorizePermissions("admin")],
    productController.updateProduct
  )
  .delete(
    [authenticate.authenticateUser, authenticate.authorizePermissions("admin")],
    productController.deleteProduct
  );


  export default router;