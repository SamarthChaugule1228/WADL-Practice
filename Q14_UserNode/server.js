const express = require("express")
const path = require("path")
const fs = require("fs")

app = express()

app.use(express.static('public'))

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin" ,"*");
    next();
});

app.get("/api/user", (req, res) => {
    
    fs.readFile("user.json", 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Error should be therr" });
        }
        res.json(JSON.parse(data));
    });
});

app.listen(3000, () => {
    console.log("app is listening : ");
});