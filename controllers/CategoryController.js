const Category = require("../models/Category");

// Lấy tất cả category
exports.index = async (req, res) => {
    try {
        const categories = await Category.find();

        res.json({
            message: "Lấy danh sách category thành công",
            categories,
        });
    } catch (error) {
        res.status(500).json({
            message: "Lỗi server",
            error: error.message,
        });
    }
};

// Lấy 1 category
exports.show = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);

        if (!category) {
            return res.status(404).json({
                message: "Không tìm thấy category",
            });
        }

        res.json({
            message: "Lấy category thành công",
            category,
        });
    } catch (error) {
        res.status(500).json({
            message: "Lỗi server",
            error: error.message,
        });
    }
};

// Thêm category
exports.store = async (req, res) => {
    try {
        const {
            name,
            slug,
            description,
            image,
            parentId,
            isActive,
        } = req.body;

        const category = new Category({
            name,
            slug,
            description,
            image,
            parentId,
            isActive,
        });

        await category.save();

        res.status(201).json({
            message: "Thêm category thành công",
            category,
        });
    } catch (error) {
        res.status(500).json({
            message: "Lỗi server",
            error: error.message,
        });
    }
};

// Sửa category
exports.update = async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!category) {
            return res.status(404).json({
                message: "Không tìm thấy category",
            });
        }

        res.json({
            message: "Cập nhật category thành công",
            category,
        });
    } catch (error) {
        res.status(500).json({
            message: "Lỗi server",
            error: error.message,
        });
    }
};

// Xóa category
exports.destroy = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(
            req.params.id
        );

        if (!category) {
            return res.status(404).json({
                message: "Không tìm thấy category",
            });
        }

        res.json({
            message: "Xóa category thành công",
            category,
        });
    } catch (error) {
        res.status(500).json({
            message: "Lỗi server",
            error: error.message,
        });
    }
};