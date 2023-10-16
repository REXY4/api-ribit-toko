const { Categories, ProductCategories } = require("../../models");

const create = async (req, res) => {
    try {
        const { name } = req.body;
        const response = await Categories.create({
            name,
        });
        res.status(200).send({
            statusCode: 200,
            status: "success",
            message: "create category success!",
            data: response
        })
    } catch (err) {
        res.status(500).send({
            statusCode: 500,
            status: "Error",
            message: "Server Error"
        })
    }
}


const getAll = async (req, res) => {
    try {
        const response = await Categories.findAll();
        res.status(200).send({
            statusCode: 200,
            status: "success",
            message: "create category success!",
            data: response
        })
    } catch (err) {
        res.status(500).send({
            statusCode: 500,
            status: "Error",
            message: "Server Error"
        })
    }
}

const addCategoriesToProduct = async (req, res) => {
    try {
        const { productId,
            CategoryId, } = req.body;
        const response = await ProductCategories.create({
            productId,
            CategoryId,
        });
        res.status(200).send({
            statusCode: 200,
            status: "success",
            message: "create category success!",
            data: response
        })
    } catch (err) {
        res.status(500).send({
            statusCode: 500,
            status: "Error",
            message: err.message
        })
    }
}


const categoryController = {
    create,
    addCategoriesToProduct,
    getAll
}

module.exports = categoryController;