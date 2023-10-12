const express = require("express");
const ProductController = require("../controllers/product");
const route = express.Router();

route.get("/products", ProductController.getAll);
route.get("/product/:id", ProductController.getDetail);
route.post("/product", ProductController.create);
route.delete("/product/:id", ProductController.deleteData);
route.put("/product/:id", ProductController.updateData);



module.exports = route;