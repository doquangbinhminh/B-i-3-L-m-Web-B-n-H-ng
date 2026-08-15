const express = require("express");

const router = express.Router();

const productController = require("../controllers/ProductController");

// Lấy tất cả product
router.get("/", productController.index);

// Lấy 1 product
router.get("/:id", productController.show);

// Thêm product
router.post("/", productController.store);

// Sửa product
router.put("/:id", productController.update);

// Xóa product
router.delete("/:id", productController.destroy);

module.exports = router;