const express = require("express");
const visitorReviewAPIRouter = express.Router();
const {
  getReviews,
  getReviewByID,
  postReview,
  updateReview,
  deleteReview,
} = require("../../../controllers/visitorReview/visitorReview.controllers");
const { reviewRules, validateReview } = require('../../../middlewares/visitorReviewValidator');

const { checkAuthenticated, checkRole } = require('../../../middlewares/Autorisation/autorisation.middleware');


visitorReviewAPIRouter.get('/', getReviews);
visitorReviewAPIRouter.get('/:id', getReviewByID);
visitorReviewAPIRouter.post('/', reviewRules(), validateReview, postReview);
visitorReviewAPIRouter.put('/:id', updateReview);
visitorReviewAPIRouter.delete('/:id', deleteReview);



module.exports = visitorReviewAPIRouter;
