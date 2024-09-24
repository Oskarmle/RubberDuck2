const express = require("express");
const router = express.Router();
const getDatabaseConnection = require("../utils.js");
const { MongoClient, ServerApiVersion } = require("mongodb");

const hostname = "127.0.0.1";
const port = 3002;
const dbName = "mongoTest"; // DRY - Don't Repeat Yourself
const messageCollection = "messages"; // DRY - Don't Repeat Yourself

const client = getDatabaseConnection();

// middleware that is specific to this router
const timeLog = (req, res, next) => {
    console.log("Time: ", new Date().toString());
    next();
};
router.use(timeLog);

// define the home page route
router.get("/", (req, res) => {
    res.send("Messages");
});
// define the about route
router.post("/", (req, res) => {
    console.log("req", req.body);
    createMessage(req.body).then((result) => {
        res.setHeader("Content-Type", "application/json");
        res.statusCode = 201;
        res.end(JSON.stringify({ ...req.body, _id: result.insertedId }));
    });
});

router.get("/", (req, res) => {
    const messages = getMessages();
    res.json(messages)
});

async function createMessage(message) {
    try {
        await client.connect();

        const result = await client
            .db(dbName)
            .collection(messageCollection)
            .insertOne(message);

        console.log(
            `A document was inserted with the _id: ${result.insertedId}`
        );
        console.log("result object", result);
        return result;
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}

async function getMessages() {
    try {
        await client.connect();

        const result = await client
            .db(dbName)
            .collection(messageCollection)
            .find();

            console.log(`All documents a here!! ${result}`);
            const messages = await result.toArray()
        return messages;
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}

module.exports = router;
