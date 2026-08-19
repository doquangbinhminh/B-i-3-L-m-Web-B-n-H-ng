const express = require("express");
const router = express.Router();

const brandController = require("../controllers/BrandController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", brandController.index);
router.get("/:id", brandController.show);

router.post(
    "/",
    authMiddleware,
    brandController.store
);

router.put(
    "/:id",
    authMiddleware,
    brandController.update
);

router.delete(
    "/:id",
    authMiddleware,
    brandController.destroy
);

module.exports = router;