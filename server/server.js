const express = require('express');
const app = express();

const { getPostcodeSuggestions } = require('./src/getPostcodeSuggestions');

app.get("/api", (req, res) => {
    res.json({"list": getPostcodeSuggestions()})
});

app.listen(5000, () => {console.log("server running")});