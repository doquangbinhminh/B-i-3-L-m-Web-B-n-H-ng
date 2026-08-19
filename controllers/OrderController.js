const Order = require("../models/Order");

// ==================== LẤY TẤT CẢ ORDER ====================

exports.index = async (req, res) => {
    try {
        const orders = await Order.find();

        res.json({
            message: "Lấy danh sách order thành công",
            orders,
        });
    } catch (error) {
        res.status(500).json({
            message: "Lỗi server",
            error: error.message,
        });
    }
};


// ==================== LẤY 1 ORDER ====================

exports.show = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({
                message: "Không tìm thấy order",
            });
        }

        res.json({
            message: "Lấy order thành công",
            order,
        });
    } catch (error) {
        res.status(500).json({
            message: "Lỗi server",
            error: error.message,
        });
    }
};


// ==================== TẠO ORDER ====================

exports.store = async (req, res) => {
    try {
        const {
            orderNumber,
            userId,
            status,
            items,
            shippingAddress,
            subtotal,
            shippingFee,
            discountAmount,
            totalAmount,
            note,
            statusHistory,
        } = req.body;

        const order = new Order({
            orderNumber,
            userId,
            status,
            items,
            shippingAddress,
            subtotal,
            shippingFee,
            discountAmount,
            totalAmount,
            note,
            statusHistory,
        });

        await order.save();

        res.status(201).json({
            message: "Tạo order thành công",
            order,
        });
    } catch (error) {
        res.status(500).json({
            message: "Lỗi server",
            error: error.message,
        });
    }
};


// ==================== SỬA ORDER ====================

exports.update = async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!order) {
            return res.status(404).json({
                message: "Không tìm thấy order",
            });
        }

        res.json({
            message: "Cập nhật order thành công",
            order,
        });
    } catch (error) {
        res.status(500).json({
            message: "Lỗi server",
            error: error.message,
        });
    }
};


// ==================== XÓA ORDER ====================

exports.destroy = async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);

        if (!order) {
            return res.status(404).json({
                message: "Không tìm thấy order",
            });
        }

        res.json({
            message: "Xóa order thành công",
            order,
        });
    } catch (error) {
        res.status(500).json({
            message: "Lỗi server",
            error: error.message,
        });
    }
};