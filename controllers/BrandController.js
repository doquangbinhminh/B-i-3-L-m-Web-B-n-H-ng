const Brand = require("../models/Brand");

// Lấy tất cả brand
exports.index = async (req, res) => {
    try {
        const brands = await Brand.find();

        res.json({
            message: "Lấy danh sách brand thành công",
            brands,
        });
    } catch (error) {
        res.status(500).json({
            message: "Lỗi server",
            error: error.message,
        });
    }
};

// Lấy 1 brand
exports.show = async (req, res) => {
    try {
        const brand = await Brand.findById(req.params.id);

        if (!brand) {
            return res.status(404).json({
                message: "Không tìm thấy brand",
            });
        }

        res.json({
            message: "Lấy brand thành công",
            brand,
        });
    } catch (error) {
        res.status(500).json({
            message: "Lỗi server",
            error: error.message,
        });
    }
};

// Thêm brand
exports.store = async (req, res) => {
    try {
        const {
            name,
            slug,
            description,
            logo,
            isActive,
        } = req.body;

        const brand = new Brand({
            name,
            slug,
            description,
            logo,
            isActive,
        });

        await brand.save();

        res.status(201).json({
            message: "Thêm brand thành công",
            brand,
        });
    } catch (error) {
        res.status(500).json({
            message: "Lỗi server",
            error: error.message,
        });
    }
};

// Sửa brand
exports.update = async (req, res) => {
    try {
        const brand = await Brand.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!brand) {
            return res.status(404).json({
                message: "Không tìm thấy brand",
            });
        }

        res.json({
            message: "Cập nhật brand thành công",
            brand,
        });
    } catch (error) {
        res.status(500).json({
            message: "Lỗi server",
            error: error.message,
        });
    }
};

// Xóa brand
exports.destroy = async (req, res) => {
    try {
        const brand = await Brand.findByIdAndDelete(
            req.params.id
        );

        if (!brand) {
            return res.status(404).json({
                message: "Không tìm thấy brand",
            });
        }

        res.json({
            message: "Xóa brand thành công",
            brand,
        });
    } catch (error) {
        res.status(500).json({
            message: "Lỗi server",
            error: error.message,
        });
    }
};