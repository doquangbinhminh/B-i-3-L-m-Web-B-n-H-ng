const Product = require("../models/Product");

// Lấy tất cả sản phẩm
exports.index = async (req, res) => {
    try {
        const products = await Product.find()
            .populate("categoryId")
            .populate("brandId");

        res.json({
            message: "Lấy danh sách product thành công",
            products,
        });
    } catch (error) {
        res.status(500).json({
            message: "Lỗi server",
            error: error.message,
        });
    }
};

// Lấy 1 sản phẩm
exports.show = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
            .populate("categoryId")
            .populate("brandId");

        if (!product) {
            return res.status(404).json({
                message: "Không tìm thấy product",
            });
        }

        res.json({
            message: "Lấy product thành công",
            product,
        });
    } catch (error) {
        res.status(500).json({
            message: "Lỗi server",
            error: error.message,
        });
    }
};

// Thêm sản phẩm
exports.store = async (req, res) => {
    try {
        const images = req.files.map((file, index) => ({
            url: `/uploads/${file.filename}`,
            alt: req.body.name,
            sortOrder: index,
            isPrimary: index === 0,
        }));

        const product = new Product({
            ...req.body,

            images,

            variants: req.body.variants
                ? JSON.parse(req.body.variants)
                : [],

            attributes: req.body.attributes
                ? JSON.parse(req.body.attributes)
                : [],

            inventory: req.body.inventory
                ? JSON.parse(req.body.inventory)
                : {},

            dimensions: req.body.dimensions
                ? JSON.parse(req.body.dimensions)
                : {},
        });

        await product.save();

        res.status(201).json({
            message: "Thêm product thành công",
            product,
        });
    } catch (error) {
        res.status(500).json({
            message: "Lỗi server",
            error: error.message,
        });
    }
};


// Sửa sản phẩm
exports.update = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!product) {
            return res.status(404).json({
                message: "Không tìm thấy product",
            });
        }

        res.json({
            message: "Cập nhật product thành công",
            product,
        });
    } catch (error) {
        res.status(500).json({
            message: "Lỗi server",
            error: error.message,
        });
    }
};

// Xóa sản phẩm
exports.destroy = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(
            req.params.id
        );

        if (!product) {
            return res.status(404).json({
                message: "Không tìm thấy product",
            });
        }

        res.json({
            message: "Xóa product thành công",
            product,
        });
    } catch (error) {
        res.status(500).json({
            message: "Lỗi server",
            error: error.message,
        });
    }
};