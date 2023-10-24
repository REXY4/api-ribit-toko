const express = require("express");
const ProductController = require("../controllers/product");
const typeController = require("../controllers/type");
const categoryController = require("../controllers/categories");
const UserController = require("../controllers/user");
const Auth = require("../middlewares/authentication");
const route = express.Router();

route.get("/products", Auth, ProductController.getAll);
route.get("/product/:id", ProductController.getDetail);
route.post("/product", ProductController.create);
route.delete("/product/:id", ProductController.deleteData);
route.put("/product/:id", ProductController.updateData);
//type
route.get("/product/type/:id", typeController.create);
//categories
route.post("/categories", categoryController.create);
route.get("/categories", categoryController.getAll);
route.post("/category/product", categoryController.addCategoriesToProduct);

route.post("/register", UserController.register);
route.post("/login", UserController.login);


module.exports = route;