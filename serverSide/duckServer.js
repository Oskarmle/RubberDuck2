const express = require("express");
var cors = require("cors");
const messagesApi = require("./api/duckApi.js");

const app = express();
const port = 3002;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/messages", messagesApi);

app.post("/messages", (req, res) => {
    console.log("req", req.body);

    // TODO: Send back the created object or at least the new id
    res.send("Creating new travel destination");
});

app.get("/messages", (req, res) => {
    res.send("Recieved all documents from MongoDb")
})

// app.put("/traveldestinations/:travelDestinationId", (req, res) => {
//     console.log("req", req.body);
//     console.log("params", req.params);
//     res.send("Updating travel destination");
// });

app.listen(port, () => {
    console.log(`Duck app listening on port ${port}`);
});
