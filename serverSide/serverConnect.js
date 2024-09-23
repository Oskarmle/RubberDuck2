import { MongoClient, ServerApiVersion } from "mongodb";
import { createServer } from "node:http";

const hostname = "127.0.0.1";
const port = 3001;

// set up connection to MongoDB
const uri = "mongodb://localhost:27017";

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecation: true,
    },
});

const server = createServer((req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS"
    );
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "POST") {
        let body = "";

        req.on("data", (chunk) => {
            body += chunk.toString();
        });
        req.on("end", () => {
            console.log("body", body);
            const data = JSON.parse(body);
            console.log("saving data", data);

            // post function
            // createMessage(data).catch(console.dir);
            createMessage(data).then((result) => {
                console.log("result", result);
                const createdMessage = data;
                createMessage._id = result.insertedId;
                res.end(JSON.stringify(createdMessage));
                res.setHeader("Content-Type", "application/json");
                res.statusCode = 201;
                
            });
        });
    } else if (req.method === "GET") {
        // get function
        getMessages().then

        res.statusCode = 200;
    }
    // res.statusCode = 201;
    // res.setHeader("Content-Type", "text/plain");
    // res.end("hello world");
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

async function createMessage(data) {
    try {
        await client.connect();
        const myDB = client.db("mongoTest");
        const myColl = myDB.collection("ducks");
        const result = await myColl.insertOne(data);
        console.log(
            `a document was inserted with the _id: ${result.insertedId}`
        );
        console.log("result object", result);
        return result;
    } finally {
        await client.close();
    }
}

async function getMessages(data) {
    try {
        await client.connect();
        const messages = await client.db("mongoTest").collection("ducks").find({}).toArray();
            return messages

    } finally {
        await client.close();
    }
}