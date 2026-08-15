const express = require("express");

const router = express.Router();

const addressController = require("../controllers/AddressController");

// Thêm địa chỉ
router.post("/:userId", addressController.store);

// Lấy danh sách địa chỉ của user
router.get("/:userId", addressController.index);

// Lấy 1 địa chỉ
router.get("/:userId/:addressId", addressController.show);

// Sửa địa chỉ
router.put("/:userId/:addressId", addressController.update);

// Xóa địa chỉ
router.delete("/:userId/:addressId", addressController.destroy);

module.exports = router;