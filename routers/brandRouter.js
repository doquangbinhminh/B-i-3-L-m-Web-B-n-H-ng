const express = require("express");

const router = express.Router();

const brandController = require("../controllers/BrandController");

// Thêm brand
router.post("/", brandController.store);

// Lấy tất cả brand
router.get("/", brandController.index);

// Lấy 1 brand
router.get("/:id", brandController.show);

// Sửa brand
router.put("/:id", brandController.update);

// Xóa brand
router.delete("/:id", brandController.destroy);

module.exports = router;