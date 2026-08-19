const express = require("express");
const router = express.Router();

const categoryController = require("../controllers/CategoryController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", categoryController.index);
router.get("/:id", categoryController.show);

router.post(
    "/",
    authMiddleware,
    categoryController.store
);

router.put(
    "/:id",
    authMiddleware,
    categoryController.update
);

router.delete(
    "/:id",
    authMiddleware,
    categoryController.destroy
);

module.exports = router;