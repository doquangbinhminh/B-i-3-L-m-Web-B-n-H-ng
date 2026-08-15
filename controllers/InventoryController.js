const InventoryTransaction = require(
    "../models/InventoryTransaction"
);

// Lấy tất cả
exports.index = async (req, res) => {
    try {
        const transactions = await InventoryTransaction.find()
            .populate("productId")
            .populate("createdBy");

        res.json({
            message: "Lấy danh sách giao dịch kho thành công",
            transactions,
        });
    } catch (error) {
        res.status(500).json({
            message: "Lỗi server",
            error: error.message,
        });
    }
};

// Lấy 1 giao dịch
exports.show = async (req, res) => {
    try {
        const transaction =
            await InventoryTransaction.findById(req.params.id)
                .populate("productId")
                .populate("createdBy");

        if (!transaction) {
            return res.status(404).json({
                message: "Không tìm thấy giao dịch kho",
            });
        }

        res.json({
            message: "Lấy giao dịch kho thành công",
            transaction,
        });
    } catch (error) {
        res.status(500).json({
            message: "Lỗi server",
            error: error.message,
        });
    }
};

// Thêm giao dịch
exports.store = async (req, res) => {
    try {
        const {
            productId,
            variantId,
            type,
            quantity,
            referenceType,
            referenceId,
            note,
            createdBy,
        } = req.body;

        const transaction = new InventoryTransaction({
            productId,
            variantId,
            type,
            quantity,
            referenceType,
            referenceId,
            note,
            createdBy,
        });

        await transaction.save();

        res.status(201).json({
            message: "Thêm giao dịch kho thành công",
            transaction,
        });
    } catch (error) {
        res.status(500).json({
            message: "Lỗi server",
            error: error.message,
        });
    }
};

// Sửa
exports.update = async (req, res) => {
    try {
        const transaction =
            await InventoryTransaction.findByIdAndUpdate(
                req.params.id,
                req.body,
                {
                    new: true,
                    runValidators: true,
                }
            );

        if (!transaction) {
            return res.status(404).json({
                message: "Không tìm thấy giao dịch kho",
            });
        }

        res.json({
            message: "Cập nhật giao dịch kho thành công",
            transaction,
        });
    } catch (error) {
        res.status(500).json({
            message: "Lỗi server",
            error: error.message,
        });
    }
};

// Xóa
exports.destroy = async (req, res) => {
    try {
        const transaction =
            await InventoryTransaction.findByIdAndDelete(
                req.params.id
            );

        if (!transaction) {
            return res.status(404).json({
                message: "Không tìm thấy giao dịch kho",
            });
        }

        res.json({
            message: "Xóa giao dịch kho thành công",
            transaction,
        });
    } catch (error) {
        res.status(500).json({
            message: "Lỗi server",
            error: error.message,
        });
    }
};