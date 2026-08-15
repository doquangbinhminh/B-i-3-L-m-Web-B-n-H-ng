const Cart = require("../models/Cart");

// Lấy tất cả giỏ hàng
exports.index = async (req, res) => {
    try {
        const carts = await Cart.find()
            .populate("userId")
            .populate("items.productId");

        res.json({
            message: "Lấy danh sách giỏ hàng thành công",
            carts,
        });
    } catch (error) {
        res.status(500).json({
            message: "Lỗi server",
            error: error.message,
        });
    }
};

// Lấy giỏ hàng của user
exports.show = async (req, res) => {
    try {
        const cart = await Cart.findOne({
            userId: req.params.userId,
        })
            .populate("userId")
            .populate("items.productId");

        if (!cart) {
            return res.status(404).json({
                message: "Không tìm thấy giỏ hàng",
            });
        }

        res.json({
            message: "Lấy giỏ hàng thành công",
            cart,
        });
    } catch (error) {
        res.status(500).json({
            message: "Lỗi server",
            error: error.message,
        });
    }
};

// Thêm giỏ hàng
exports.store = async (req, res) => {
    try {
        const {
            userId,
            items,
        } = req.body;

        const cart = new Cart({
            userId,
            items,
        });

        await cart.save();

        res.status(201).json({
            message: "Thêm giỏ hàng thành công",
            cart,
        });
    } catch (error) {
        res.status(500).json({
            message: "Lỗi server",
            error: error.message,
        });
    }
};

// Cập nhật giỏ hàng
exports.update = async (req, res) => {
    try {
        const cart = await Cart.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!cart) {
            return res.status(404).json({
                message: "Không tìm thấy giỏ hàng",
            });
        }

        res.json({
            message: "Cập nhật giỏ hàng thành công",
            cart,
        });
    } catch (error) {
        res.status(500).json({
            message: "Lỗi server",
            error: error.message,
        });
    }
};

// Xóa giỏ hàng
exports.destroy = async (req, res) => {
    try {
        const cart = await Cart.findByIdAndDelete(
            req.params.id
        );

        if (!cart) {
            return res.status(404).json({
                message: "Không tìm thấy giỏ hàng",
            });
        }

        res.json({
            message: "Xóa giỏ hàng thành công",
            cart,
        });
    } catch (error) {
        res.status(500).json({
            message: "Lỗi server",
            error: error.message,
        });
    }
};