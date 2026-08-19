const Review = require("../models/Review");

// ==================== LẤY TẤT CẢ REVIEW ====================

exports.index = async (req, res) => {
    try {
        const reviews = await Review.find();

        res.json({
            message: "Lấy danh sách review thành công",
            reviews,
        });
    } catch (error) {
        res.status(500).json({
            message: "Lỗi server",
            error: error.message,
        });
    }
};


// ==================== LẤY 1 REVIEW ====================

exports.show = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);

        if (!review) {
            return res.status(404).json({
                message: "Không tìm thấy review",
            });
        }

        res.json({
            message: "Lấy review thành công",
            review,
        });
    } catch (error) {
        res.status(500).json({
            message: "Lỗi server",
            error: error.message,
        });
    }
};


// ==================== TẠO REVIEW ====================

exports.store = async (req, res) => {
    try {
        const {
            userId,
            productId,
            orderId,
            rating,
            title,
            content,
            images,
            verifiedPurchase,
        } = req.body;

        const review = new Review({
            userId,
            productId,
            orderId,
            rating,
            title,
            content,
            images,
            verifiedPurchase,
        });

        await review.save();

        res.status(201).json({
            message: "Tạo review thành công",
            review,
        });
    } catch (error) {
        res.status(500).json({
            message: "Lỗi server",
            error: error.message,
        });
    }
};


// ==================== SỬA REVIEW ====================

exports.update = async (req, res) => {
    try {
        const review = await Review.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!review) {
            return res.status(404).json({
                message: "Không tìm thấy review",
            });
        }

        res.json({
            message: "Cập nhật review thành công",
            review,
        });
    } catch (error) {
        res.status(500).json({
            message: "Lỗi server",
            error: error.message,
        });
    }
};


// ==================== XÓA REVIEW ====================

exports.destroy = async (req, res) => {
    try {
        const review = await Review.findByIdAndDelete(req.params.id);

        if (!review) {
            return res.status(404).json({
                message: "Không tìm thấy review",
            });
        }

        res.json({
            message: "Xóa review thành công",
            review,
        });
    } catch (error) {
        res.status(500).json({
            message: "Lỗi server",
            error: error.message,
        });
    }
};