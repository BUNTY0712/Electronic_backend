const express = require('express');

const {
    insertProductController,
    getAllProductController
} = require("../controllers/productController");

const router = express.Router();

router.post("/insertproduct", insertProductController);
router.get("/getallproduct",getAllProductController );

module.exports = router;