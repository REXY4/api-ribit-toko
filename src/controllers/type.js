const { Type } = require("../../models");

const create = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, type } = req.body;
        const createData = await Type.create({
            name,
            type,
            productId: id,
        });
        res.status(200).send({
            statusCode: 200,
            status: "success",
            message: "create type success !",
            data: createData
        })

    } catch (err) {
        res.status(500).send({
            statusCode: 500,
            status: "success",
            message: "Server Error"
        })
    }
}



const typeController = {
    create
}

module.exports = typeController