const express = require("express");

const router = express.Router();

const roleController = require("../controllers/RoleController");

// Thêm role
router.post("/", roleController.store);

// Lấy tất cả role
router.get("/", roleController.index);

// Lấy 1 role
router.get("/:id", roleController.show);

// Sửa role
router.put("/:id", roleController.update);

// Xóa role
router.delete("/:id", roleController.destroy);

module.exports = router;