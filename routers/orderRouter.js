const express = require("express");
const router = express.Router();

const orderController = require("../controllers/OrderController");
const authMiddleware = require("../middleware/authMiddleware");

router.get(
    "/",
    authMiddleware,
    orderController.index
);

router.get(
    "/:id",
    authMiddleware,
    orderController.show
);

router.post(
    "/",
    authMiddleware,
    orderController.store
);

router.put(
    "/:id",
    authMiddleware,
    orderController.update
);

router.delete(
    "/:id",
    authMiddleware,
    orderController.destroy
);

module.exports = router;