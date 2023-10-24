const { Users } = require("../../models")
const Joi = require("joi")
const Bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password
        } = req.body;
        const schema = Joi.object({
            firstName: Joi.string().min(4).max(20).required(),
            lastName: Joi.string().min(4).max(20).required(),
            email: Joi.string().email().min(3).max(20).required(),
            password: Joi.string().min(8).pattern(new RegExp('^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$')).required(),
        });
        const { error } = await schema.validate(req.body);
        if (error) {
            return res.status(400).send({
                statusCode: 400,
                status: "fail",
                message: error.details[0].message
            })
        }
        const findUser = await Users.findOne({
            where: { email }
        });
        if (findUser) {
            return res.status(200).send({
                statusCode: 200,
                status: "failed",
                message: "email dan password sudah terdaftar !"
            })
        }
        const saltRounds = 15;
        const encrypPassword = Bcrypt.hashSync(password, saltRounds);
        const response = await Users.create({
            firstName,
            lastName,
            email,
            password: encrypPassword
        })
        res.status(200).send({
            statusCode: 200,
            status: "success",
            message: "Register sucess!",
            data: response
        })
    } catch (err) {
        res.status(500).send({
            statusCode: 500,
            status: "error",
            message: err.message
        })
    }
}


const login = async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body;
        const schema = Joi.object({
            email: Joi.string().email().min(3).max(20).required(),
            password: Joi.string().required(),
        });
        const { error } = await schema.validate(req.body);
        if (error) {
            return res.status(400).send({
                statusCode: 400,
                status: "fail",
                message: error.details[0].message
            })
        }
        const findUser = await Users.findOne({
            where: { email }
        });
        if (!findUser) {
            return res.status(400).send({
                statusCode: 400,
                status: "Fail",
                message: "email dan password salah! silahkan coba check email dan password anda"
            })
        }
        const isValid = Bcrypt.compareSync(password, findUser.password);
        if (!isValid) {
            return res.status(400).send({
                statusCode: 400,
                message: "email dan passwod salah!, silahkan coba check email dan password anda",
            })
        }
        const SECRET_KEY = process.env.SECRET_KEY;
        const token = jwt.sign({ id: findUser.id }, SECRET_KEY);
        res.status(200).send({
            statusCode: 200,
            status: "success",
            message: "Register sucess!",
            data: {
                token
            }
        })
    } catch (err) {
        res.status(500).send({
            statusCode: 500,
            status: "error",
            message: err.message
        })
    }
}


const UserController = {
    register,
    login
}

module.exports = UserController 