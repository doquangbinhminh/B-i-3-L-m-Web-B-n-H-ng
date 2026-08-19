const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    try {
        // Lấy Authorization header
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                message: "Chưa đăng nhập",
            });
        }

        // Kiểm tra Bearer
        const parts = authHeader.split(" ");

        if (parts.length !== 2 || parts[0] !== "Bearer") {
            return res.status(401).json({
                message: "Token không đúng định dạng",
            });
        }

        const token = parts[1];

        // Kiểm tra token
        const decoded = jwt.verify(
            token,
            "ACCESS_SECRET_KEY"
        );

        // Lưu thông tin user vào req.user
        req.user = decoded;

        next();

    } catch (error) {
        return res.status(401).json({
            message: "Token không hợp lệ hoặc đã hết hạn",
            error: error.message,
        });
    }
};

module.exports = authMiddleware;