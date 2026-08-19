const Cart = require("../models/Cart");

// ==================== CART ====================

// Lấy tất cả cart
exports.index = async (req, res) => {
    try {
        const carts = await Cart.find();

        res.json({
            message: "Lấy danh sách cart thành công",
            carts,
        });
    } catch (error) {
        res.status(500).json({
            message: "Lỗi server",
            error: error.message,
        });
    }
};


// Lấy 1 cart
exports.show = async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.id);

        if (!cart) {
            return res.status(404).json({
                message: "Không tìm thấy cart",
            });
        }

        res.json({
            message: "Lấy cart thành công",
            cart,
        });
    } catch (error) {
        res.status(500).json({
            message: "Lỗi server",
            error: error.message,
        });
    }
};


// Tạo cart
exports.store = async (req, res) => {
    try {
        const cart = new Cart({
            userId: req.body.userId,
            items: [],
        });

        await cart.save();

        res.status(201).json({
            message: "Tạo cart thành công",
            cart,
        });
    } catch (error) {
        res.status(500).json({
            message: "Lỗi server",
            error: error.message,
        });
    }
};


// Xóa toàn bộ cart
exports.destroy = async (req, res) => {
    try {
        const cart = await Cart.findByIdAndDelete(req.params.id);

        if (!cart) {
            return res.status(404).json({
                message: "Không tìm thấy cart",
            });
        }

        res.json({
            message: "Xóa cart thành công",
            cart,
        });
    } catch (error) {
        res.status(500).json({
            message: "Lỗi server",
            error: error.message,
        });
    }
};


// ==================== CART ITEM ====================

// Thêm sản phẩm vào cart
exports.addItem = async (req, res) => {
    try {
        const {
            productId,
            variantId,
            quantity,
        } = req.body;

        const cart = await Cart.findOne({
            userId: req.params.userId,
        });

        if (!cart) {
            return res.status(404).json({
                message: "User chưa có cart",
            });
        }

        cart.items.push({
            productId,
            variantId,
            quantity,
        });

        await cart.save();

        res.status(201).json({
            message: "Thêm sản phẩm vào cart thành công",
            cart,
        });
    } catch (error) {
        res.status(500).json({
            message: "Lỗi server",
            error: error.message,
        });
    }
};


// Sửa số lượng Cart Item
exports.updateItem = async (req, res) => {
    try {
        const cart = await Cart.findOne({
            userId: req.params.userId,
        });

        if (!cart) {
            return res.status(404).json({
                message: "Không tìm thấy cart",
            });
        }

        const item = cart.items.id(req.params.itemId);

        if (!item) {
            return res.status(404).json({
                message: "Không tìm thấy cart item",
            });
        }

        item.quantity = req.body.quantity;

        await cart.save();

        res.json({
            message: "Cập nhật cart item thành công",
            cart,
        });
    } catch (error) {
        res.status(500).json({
            message: "Lỗi server",
            error: error.message,
        });
    }
};


// Xóa Cart Item
exports.removeItem = async (req, res) => {
    try {
        const cart = await Cart.findOne({
            userId: req.params.userId,
        });

        if (!cart) {
            return res.status(404).json({
                message: "Không tìm thấy cart",
            });
        }

        const item = cart.items.id(req.params.itemId);

        if (!item) {
            return res.status(404).json({
                message: "Không tìm thấy cart item",
            });
        }

        item.deleteOne();

        await cart.save();

        res.json({
            message: "Xóa sản phẩm khỏi cart thành công",
            cart,
        });
    } catch (error) {
        res.status(500).json({
            message: "Lỗi server",
            error: error.message,
        });
    }
};