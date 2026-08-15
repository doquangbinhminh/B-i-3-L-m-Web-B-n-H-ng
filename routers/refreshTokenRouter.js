const express = require("express");

const router = express.Router();

const refreshTokenController = require("../controllers/RefreshTokenController");

// Thêm refresh token
router.post("/", refreshTokenController.store);

// Lấy tất cả refresh token
router.get("/", refreshTokenController.index);

// Lấy 1 refresh token
router.get("/:id", refreshTokenController.show);

// Thu hồi refresh token
router.put("/:id/revoke", refreshTokenController.revoke);

// Xóa refresh token
router.delete("/:id", refreshTokenController.destroy);

module.exports = router;