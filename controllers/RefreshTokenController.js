const RefreshToken = require("../models/RefreshToken");

// Lấy tất cả refresh token
exports.index = async (req, res) => {
    try {
        const refreshTokens = await RefreshToken.find();

        res.json({
            message: "Lấy danh sách refresh token thành công",
            refreshTokens,
        });
    } catch (error) {
        res.status(500).json({
            message: "Lỗi server",
            error: error.message,
        });
    }
};

// Lấy 1 refresh token
exports.show = async (req, res) => {
    try {
        const refreshToken = await RefreshToken.findById(req.params.id);

        if (!refreshToken) {
            return res.status(404).json({
                message: "Không tìm thấy refresh token",
            });
        }

        res.json({
            message: "Lấy refresh token thành công",
            refreshToken,
        });
    } catch (error) {
        res.status(500).json({
            message: "Lỗi server",
            error: error.message,
        });
    }
};

// Thêm refresh token
exports.store = async (req, res) => {
    try {
        const {
            userId,
            tokenHash,
            expiresAt,
            ipAddress,
            userAgent,
        } = req.body;

        const refreshToken = new RefreshToken({
            userId,
            tokenHash,
            expiresAt,
            ipAddress,
            userAgent,
        });

        await refreshToken.save();

        res.status(201).json({
            message: "Thêm refresh token thành công",
            refreshToken,
        });
    } catch (error) {
        res.status(500).json({
            message: "Lỗi server",
            error: error.message,
        });
    }
};

// Thu hồi refresh token
exports.revoke = async (req, res) => {
    try {
        const refreshToken = await RefreshToken.findByIdAndUpdate(
            req.params.id,
            {
                revokedAt: new Date(),
            },
            {
                new: true,
            }
        );

        if (!refreshToken) {
            return res.status(404).json({
                message: "Không tìm thấy refresh token",
            });
        }

        res.json({
            message: "Thu hồi refresh token thành công",
            refreshToken,
        });
    } catch (error) {
        res.status(500).json({
            message: "Lỗi server",
            error: error.message,
        });
    }
};

// Xóa refresh token
exports.destroy = async (req, res) => {
    try {
        const refreshToken = await RefreshToken.findByIdAndDelete(
            req.params.id
        );

        if (!refreshToken) {
            return res.status(404).json({
                message: "Không tìm thấy refresh token",
            });
        }

        res.json({
            message: "Xóa refresh token thành công",
            refreshToken,
        });
    } catch (error) {
        res.status(500).json({
            message: "Lỗi server",
            error: error.message,
        });
    }
};