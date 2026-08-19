const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// Lấy tất cả user
exports.index = async (req, res) => {
    try {
        const users = await User.find();

        res.json({
            message: "Lấy danh sách user thành công",
            users,
        });
    } catch (error) {
        res.status(500).json({
            message: "Lỗi server",
            error: error.message,
        });
    }
};

// Lấy 1 user
exports.show = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                message: "Không tìm thấy user",
            });
        }

        res.json({
            message: "Lấy user thành công",
            user,
        });
    } catch (error) {
        res.status(500).json({
            message: "Lỗi server",
            error: error.message,
        });
    }
};

// Thêm user
exports.store = async (req, res) => {
    try {
        const {
            email,
            username,
            password,
            firstName,
            lastName,
            phone,
            avatar,
            roleId,
            status,
            emailVerified,
            addresses,
        } = req.body;

        // Mã hóa password
        const passwordHash = await bcrypt.hash(password, 10);

        const user = new User({
            email,
            username,
            passwordHash,
            firstName,
            lastName,
            phone,
            avatar,
            roleId,
            status,
            emailVerified,
            addresses,
        });

        await user.save();

        res.status(201).json({
            message: "Thêm user thành công",
            user,
        });
    } catch (error) {
        res.status(500).json({
            message: "Lỗi server",
            error: error.message,
        });
    }
};

// Sửa user
exports.update = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!user) {
            return res.status(404).json({
                message: "Không tìm thấy user",
            });
        }

        res.json({
            message: "Cập nhật user thành công",
            user,
        });
    } catch (error) {
        res.status(500).json({
            message: "Lỗi server",
            error: error.message,
        });
    }
};

// Xóa user
exports.destroy = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).json({
                message: "Không tìm thấy user",
            });
        }

        res.json({
            message: "Xóa user thành công",
            user,
        });
    } catch (error) {
        res.status(500).json({
            message: "Lỗi server",
            error: error.message,
        });
    }
};

// Đăng nhập
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Tìm user theo email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "Email không tồn tại",
            });
        }

        // Kiểm tra mật khẩu
        const isMatch = await bcrypt.compare(
            password,
            user.passwordHash
        );

        if (!isMatch) {
            return res.status(401).json({
                message: "Mật khẩu không đúng",
            });
        }

        // Tạo access token
        const accessToken = jwt.sign(
            {
                id: user._id,
                email: user.email,
                roleId: user.roleId,
            },
            "ACCESS_SECRET_KEY",
            {
                expiresIn: "15m",
            }
        );

        // Tạo refresh token
        const refreshToken = jwt.sign(
            {
                id: user._id,
            },
            "REFRESH_SECRET_KEY",
            {
                expiresIn: "7d",
            }
        );

        // Lưu refresh token vào User
        user.refreshToken = refreshToken;

        await user.save();

        res.json({
            message: "Đăng nhập thành công",
            accessToken,
            refreshToken,
        });
    } catch (error) {
        res.status(500).json({
            message: "Lỗi server",
            error: error.message,
        });
    }
};

exports.refreshToken = async (req, res) => {
    try {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            return res.status(401).json({
                message: "Không có refresh token",
            });
        }

        // Kiểm tra refresh token
        const decoded = jwt.verify(
            refreshToken,
            "REFRESH_SECRET_KEY"
        );

        // Tìm user
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(404).json({
                message: "Không tìm thấy user",
            });
        }

        // Kiểm tra token trong DB
        if (user.refreshToken !== refreshToken) {
            return res.status(401).json({
                message: "Refresh token không hợp lệ",
            });
        }

        // Tạo access token mới
        const accessToken = jwt.sign(
            {
                id: user._id,
                email: user.email,
                roleId: user.roleId,
            },
            "ACCESS_SECRET_KEY",
            {
                expiresIn: "15m",
            }
        );

        res.json({
            message: "Tạo access token mới thành công",
            accessToken,
        });

    } catch (error) {
        res.status(401).json({
            message: "Refresh token hết hạn hoặc không hợp lệ",
            error: error.message,
        });
    }
};

exports.logout = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                message: "Không tìm thấy user",
            });
        }

        user.refreshToken = null;

        await user.save();

        res.json({
            message: "Đăng xuất thành công",
        });
    } catch (error) {
        res.status(500).json({
            message: "Lỗi server",
            error: error.message,
        });
    }
};