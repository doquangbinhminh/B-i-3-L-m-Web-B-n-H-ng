const express = require("express");
const mongoose = require("mongoose");

const userRouter = require("./routers/userRouter");
const addressRouter = require("./routers/addressRouter");
const roleRouter = require("./routers/roleRouter");
const permissionRouter = require("./routers/permissionRouter");
const refreshTokenRouter = require("./routers/refreshTokenRouter");
const categoryRouter = require("./routers/categoryRouter");
const brandRouter = require("./routers/brandRouter");
const productRouter = require("./routers/productRouter");
const inventoryTransactionRouter = require("./routers/inventoryTransactionRouter");
const cartRouter = require("./routers/cartRouter");

// const shipmentRouter = require("./routers/shipmentRouter");
// const reviewRouter = require("./routers/reviewRouter");
// const paymentRouter = require("./routers/paymentRouter");
// const orderRouter = require("./routers/orderRouter");

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/uploads", express.static("uploads"));

// Kết nối MongoDB
mongoose
    .connect("mongodb://127.0.0.1:27017/GundamDB")
    .then(() => {
        console.log("Kết nối MongoDB thành công");
    })
    .catch((err) => {
        console.log(err);
    });

// Trang chủ
app.get("/", (req, res) => {
    res.send("Web Gundam API đang chạy");
});

// ROUTERS

app.use("/users", userRouter);

app.use("/addresses", addressRouter);

app.use("/roles", roleRouter);

app.use("/permissions", permissionRouter);

app.use("/refreshtoken", refreshTokenRouter);

app.use("/categories", categoryRouter);

app.use("/brands", brandRouter);

app.use("/products", productRouter);

app.use(
    "/inventorytransactions",
    inventoryTransactionRouter
);

app.use("/carts", cartRouter);

// Chưa làm
// app.use("/orders", orderRouter);
// app.use("/payments", paymentRouter);
// app.use("/shipments", shipmentRouter);
// app.use("/reviews", reviewRouter);

// Chạy server
app.listen(PORT, () => {
    console.log(
        `Server running at http://localhost:${PORT}`
    );
});