const Role = require("../models/Role");

// Lấy tất cả Role
exports.index = async (req, res) => {
    try {
        const roles = await Role.find();

        res.json({
            message: "Lấy danh sách role thành công",
            roles,
        });
    } catch (error) {
        res.status(500).json({
            message: "Lỗi server",
            error: error.message,
        });
    }
};

// Lấy 1 Role
exports.show = async (req, res) => {
    try {
        const role = await Role.findById(req.params.id);

        if (!role) {
            return res.status(404).json({
                message: "Không tìm thấy role",
            });
        }

        res.json({
            message: "Lấy role thành công",
            role,
        });
    } catch (error) {
        res.status(500).json({
            message: "Lỗi server",
            error: error.message,
        });
    }
};

// Thêm Role
exports.store = async (req, res) => {
    try {
        const {
            name,
            description,
            permissionIds,
        } = req.body;

        const role = new Role({
            name,
            description,
            permissionIds,
        });

        await role.save();

        res.status(201).json({
            message: "Thêm role thành công",
            role,
        });
    } catch (error) {
        res.status(500).json({
            message: "Lỗi server",
            error: error.message,
        });
    }
};

// Sửa Role
exports.update = async (req, res) => {
    try {
        const role = await Role.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!role) {
            return res.status(404).json({
                message: "Không tìm thấy role",
            });
        }

        res.json({
            message: "Cập nhật role thành công",
            role,
        });
    } catch (error) {
        res.status(500).json({
            message: "Lỗi server",
            error: error.message,
        });
    }
};

// Xóa Role
exports.destroy = async (req, res) => {
    try {
        const role = await Role.findByIdAndDelete(req.params.id);

        if (!role) {
            return res.status(404).json({
                message: "Không tìm thấy role",
            });
        }

        res.json({
            message: "Xóa role thành công",
            role,
        });
    } catch (error) {
        res.status(500).json({
            message: "Lỗi server",
            error: error.message,
        });
    }
};