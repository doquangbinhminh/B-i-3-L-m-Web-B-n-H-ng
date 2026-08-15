const User = require("../models/User");

// =========================
// THÊM ĐỊA CHỈ
// =========================
exports.store = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);

        if (!user) {
            return res.status(404).json({
                message: "Không tìm thấy user",
            });
        }

        user.addresses.push(req.body);

        await user.save();

        res.status(201).json({
            message: "Thêm địa chỉ thành công",
            address: user.addresses[user.addresses.length - 1],
        });
    } catch (error) {
        res.status(500).json({
            message: "Lỗi server",
            error: error.message,
        });
    }
};

// =========================
// LẤY TẤT CẢ ĐỊA CHỈ
// =========================
exports.index = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);

        if (!user) {
            return res.status(404).json({
                message: "Không tìm thấy user",
            });
        }

        res.json({
            message: "Lấy danh sách địa chỉ thành công",
            addresses: user.addresses,
        });
    } catch (error) {
        res.status(500).json({
            message: "Lỗi server",
            error: error.message,
        });
    }
};

// =========================
// LẤY 1 ĐỊA CHỈ
// =========================
exports.show = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);

        if (!user) {
            return res.status(404).json({
                message: "Không tìm thấy user",
            });
        }

        const address = user.addresses.id(req.params.addressId);

        if (!address) {
            return res.status(404).json({
                message: "Không tìm thấy địa chỉ",
            });
        }

        res.json({
            message: "Lấy địa chỉ thành công",
            address,
        });
    } catch (error) {
        res.status(500).json({
            message: "Lỗi server",
            error: error.message,
        });
    }
};

// =========================
// SỬA ĐỊA CHỈ
// =========================
exports.update = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);

        if (!user) {
            return res.status(404).json({
                message: "Không tìm thấy user",
            });
        }

        const address = user.addresses.id(req.params.addressId);

        if (!address) {
            return res.status(404).json({
                message: "Không tìm thấy địa chỉ",
            });
        }

        Object.assign(address, req.body);

        await user.save();

        res.json({
            message: "Cập nhật địa chỉ thành công",
            address,
        });
    } catch (error) {
        res.status(500).json({
            message: "Lỗi server",
            error: error.message,
        });
    }
};

// =========================
// XÓA ĐỊA CHỈ
// =========================
exports.destroy = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);

        if (!user) {
            return res.status(404).json({
                message: "Không tìm thấy user",
            });
        }

        const address = user.addresses.id(req.params.addressId);

        if (!address) {
            return res.status(404).json({
                message: "Không tìm thấy địa chỉ",
            });
        }

        address.deleteOne();

        await user.save();

        res.json({
            message: "Xóa địa chỉ thành công",
        });
    } catch (error) {
        res.status(500).json({
            message: "Lỗi server",
            error: error.message,
        });
    }
};