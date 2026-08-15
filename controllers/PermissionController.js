const Permission = require("../models/Permission");

// Lấy tất cả permission
exports.index = async (req, res) => {
    try {
        const permissions = await Permission.find();

        res.json({
            message: "Lấy danh sách permission thành công",
            permissions,
        });
    } catch (error) {
        res.status(500).json({
            message: "Lỗi server",
            error: error.message,
        });
    }
};

// Lấy 1 permission
exports.show = async (req, res) => {
    try {
        const permission = await Permission.findById(req.params.id);

        if (!permission) {
            return res.status(404).json({
                message: "Không tìm thấy permission",
            });
        }

        res.json({
            message: "Lấy permission thành công",
            permission,
        });
    } catch (error) {
        res.status(500).json({
            message: "Lỗi server",
            error: error.message,
        });
    }
};

// Thêm permission
exports.store = async (req, res) => {
    try {
        const {
            name,
            description,
        } = req.body;

        const permission = new Permission({
            name,
            description,
        });

        await permission.save();

        res.status(201).json({
            message: "Thêm permission thành công",
            permission,
        });
    } catch (error) {
        res.status(500).json({
            message: "Lỗi server",
            error: error.message,
        });
    }
};

// Sửa permission
exports.update = async (req, res) => {
    try {
        const permission = await Permission.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!permission) {
            return res.status(404).json({
                message: "Không tìm thấy permission",
            });
        }

        res.json({
            message: "Cập nhật permission thành công",
            permission,
        });
    } catch (error) {
        res.status(500).json({
            message: "Lỗi server",
            error: error.message,
        });
    }
};

// Xóa permission
exports.destroy = async (req, res) => {
    try {
        const permission = await Permission.findByIdAndDelete(
            req.params.id
        );

        if (!permission) {
            return res.status(404).json({
                message: "Không tìm thấy permission",
            });
        }

        res.json({
            message: "Xóa permission thành công",
            permission,
        });
    } catch (error) {
        res.status(500).json({
            message: "Lỗi server",
            error: error.message,
        });
    }
};