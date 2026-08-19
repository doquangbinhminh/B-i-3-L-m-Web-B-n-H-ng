const express = require("express");
const router = express.Router();

const productController = require("../controllers/ProductController");
const upload = require("../middleware/uploadMiddleware");

const authMiddleware = require("../middleware/authMiddleware");

router.get("/", productController.index);
router.get("/:id", productController.show);

router.post(
    "/",
    authMiddleware,
    upload.array("images", 10),
    productController.store
);

router.put(
    "/:id",
    authMiddleware,
    productController.update
);

router.delete(
    "/:id",
    authMiddleware,
    productController.destroy
);

module.exports = router;