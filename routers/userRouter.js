const express = require("express");

const router = express.Router();

const userController = require("../controllers/UserController");

// Thêm user
router.post("/", userController.store);


// Lấy tất cả user
router.get("/", userController.index);

// Profile - để sau khi làm JWT
// router.get("/profile", ...);
// Đăng nhập
router.post("/login", userController.login);
// Lấy 1 user
router.get("/:id", userController.show);

// Sửa user
router.put("/:id", userController.update);

// Xóa user
router.delete("/:id", userController.destroy);



module.exports = router;