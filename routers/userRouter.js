const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const userController = require("../controllers/UserController");

// ==================== AUTH ====================

// Đăng nhập
router.post("/login", userController.login);

// Refresh access token
router.post("/refresh", userController.refreshToken);

// Đăng xuất
router.post(
    "/logout",
    authMiddleware,
    userController.logout
);


// ==================== USER ====================

// Thêm user
router.post("/", userController.store);

// Lấy tất cả user
router.get("/", userController.index);

// Lấy 1 user
router.get("/:id", userController.show);

// Sửa user
router.put("/:id", userController.update);

// Xóa user
router.delete("/:id", userController.destroy);


module.exports = router;