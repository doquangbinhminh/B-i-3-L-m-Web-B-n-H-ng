const express = require("express");

const router = express.Router();

const roleController = require("../controllers/RoleController");
const authMiddleware = require("../middleware/authMiddleware");

// ==================== ROLE ====================

// Lấy tất cả role
router.get(
    "/",
    authMiddleware,
    roleController.index
);

// Lấy 1 role
router.get(
    "/:id",
    authMiddleware,
    roleController.show
);

// Thêm role
router.post(
    "/",
    authMiddleware,
    roleController.store
);

// Sửa role
router.put(
    "/:id",
    authMiddleware,
    roleController.update
);

// Xóa role
router.delete(
    "/:id",
    authMiddleware,
    roleController.destroy
);

module.exports = router;