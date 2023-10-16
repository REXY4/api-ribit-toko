const express = require("express");
const router = require("./src/routes");
const app = express();
require("dotenv").config();

const host = process.env.APP_HOST;
const port = process.env.APP_PORT || 4000;

app.use(express.json());

app.get("/", async (req, res) => {
    res.status(200).send({
        statusCode: 200,
        message: "hallo api ribit toko"
    })
})

app.use("/api/v1", router)
//body parser;
app.listen(port, () => console.log(`Running on ${host}:${port}`))