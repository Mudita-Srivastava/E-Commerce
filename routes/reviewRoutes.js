import express from "express";
import reviewController from "../controllers/reviewController.js";
import authenticate from "../middleware/authentication.js";

const router = express.Router();

router
  .route("/")
  .post(authenticate.authenticateUser, reviewController.createReview)
  .get(reviewController.getAllReviews);

router
  .route("/:id")
  .get(reviewController.getSingleReview)
  .patch(authenticate.authenticateUser, reviewController.updateReview)
  .delete(authenticate.authenticateUser, reviewController.deleteReview);


  export default router;
