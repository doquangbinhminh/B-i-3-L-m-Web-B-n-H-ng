const express = require("express");

const router = express.Router();

const categoryController = require("../controllers/CategoryController");

// Thêm category
router.post("/", categoryController.store);

// Lấy tất cả category
router.get("/", categoryController.index);

// Lấy 1 category
router.get("/:id", categoryController.show);

// Sửa category
router.put("/:id", categoryController.update);

// Xóa category
router.delete("/:id", categoryController.destroy);

module.exports = router;