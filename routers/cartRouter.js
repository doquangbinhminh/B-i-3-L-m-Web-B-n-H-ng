const express = require("express");

const router = express.Router();

const cartController = require("../controllers/CartController");

// Thêm cart
router.post("/", cartController.store);

// Lấy tất cả cart
router.get("/", cartController.index);

// Lấy cart của user
router.get("/:userId", cartController.show);

// Sửa cart
router.put("/:id", cartController.update);

// Xóa cart
router.delete("/:id", cartController.destroy);

module.exports = router;