const express = require("express");

const router = express.Router();

const inventoryTransactionController = require(
    "../controllers/InventoryController"
);

// Thêm giao dịch kho
router.post("/", inventoryTransactionController.store);

// Lấy tất cả giao dịch
router.get("/", inventoryTransactionController.index);

// Lấy 1 giao dịch
router.get("/:id", inventoryTransactionController.show);

// Sửa giao dịch
router.put("/:id", inventoryTransactionController.update);

// Xóa giao dịch
router.delete("/:id", inventoryTransactionController.destroy);

module.exports = router;