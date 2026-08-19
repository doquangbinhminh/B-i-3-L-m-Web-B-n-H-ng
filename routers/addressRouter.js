const express = require("express");

const router = express.Router();

const addressController = require("../controllers/AddressController");
const authMiddleware = require("../middleware/authMiddleware");

// ==================== ADDRESS ====================

// Thêm địa chỉ cho user
router.post(
    "/:userId",
    authMiddleware,
    addressController.store
);

// Lấy danh sách địa chỉ của user
router.get(
    "/:userId",
    authMiddleware,
    addressController.index
);

// Lấy 1 địa chỉ của user
router.get(
    "/:userId/:addressId",
    authMiddleware,
    addressController.show
);

// Sửa địa chỉ
router.put(
    "/:userId/:addressId",
    authMiddleware,
    addressController.update
);

// Xóa địa chỉ
router.delete(
    "/:userId/:addressId",
    authMiddleware,
    addressController.destroy
);

module.exports = router;