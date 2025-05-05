import express from "express";
import userController from "../controllers/userController.js";
import authenticate from "../middleware/authentication.js";

const router = express.Router();

router
  .route("/")
  .get(
    authenticate.authenticateUser,
    authenticate.authorizePermissions("admin"),
    userController.getAllUsers
  );

router
  .route("/showMe")
  .get(authenticate.authenticateUser, userController.showCurrentUser);
router.route("/updateUser").patch(authenticate.authenticateUser,userController.updateUser);
router.route("/updateUserPassword").patch(authenticate.authenticateUser,userController.updateUserPassword);

router
  .route("/:id")
  .get(authenticate.authenticateUser, userController.getSingleUser);

export default router;
