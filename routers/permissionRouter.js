const express = require("express");

const router = express.Router();

const permissionController = require("../controllers/PermissionController");
const authMiddleware = require("../middleware/authMiddleware");

// Thêm permission
router.post("/",authMiddleware, permissionController.store);

// Lấy tất cả permission
router.get("/",authMiddleware, permissionController.index);

// Lấy 1 permission
router.get("/:id",authMiddleware, permissionController.show);

// Sửa permission
router.put("/:id",authMiddleware, permissionController.update);

// Xóa permission
router.delete("/:id",authMiddleware, permissionController.destroy);

module.exports = router;