const express = require("express");

const router = express.Router();

const permissionController = require("../controllers/PermissionController");

// Thêm permission
router.post("/", permissionController.store);

// Lấy tất cả permission
router.get("/", permissionController.index);

// Lấy 1 permission
router.get("/:id", permissionController.show);

// Sửa permission
router.put("/:id", permissionController.update);

// Xóa permission
router.delete("/:id", permissionController.destroy);

module.exports = router;