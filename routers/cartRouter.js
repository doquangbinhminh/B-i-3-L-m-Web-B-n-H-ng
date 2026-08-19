const express = require("express");
const router = express.Router();

const cartController = require("../controllers/CartController");
const authMiddleware = require("../middleware/authMiddleware");

router.get(
    "/",
    authMiddleware,
    cartController.index
);

router.get(
    "/:id",
    authMiddleware,
    cartController.show
);

router.post(
    "/",
    authMiddleware,
    cartController.store
);

router.post(
    "/user/:userId/items",
    authMiddleware,
    cartController.addItem
);

router.put(
    "/user/:userId/items/:itemId",
    authMiddleware,
    cartController.updateItem
);

router.delete(
    "/user/:userId/items/:itemId",
    authMiddleware,
    cartController.removeItem
);

router.delete(
    "/:id",
    authMiddleware,
    cartController.destroy
);

module.exports = router;