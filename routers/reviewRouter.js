const express = require("express");
const router = express.Router();

const reviewController = require("../controllers/ReviewController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", reviewController.index);

router.get("/:id", reviewController.show);

router.post(
    "/",
    authMiddleware,
    reviewController.store
);

router.put(
    "/:id",
    authMiddleware,
    reviewController.update
);

router.delete(
    "/:id",
    authMiddleware,
    reviewController.destroy
);

module.exports = router;