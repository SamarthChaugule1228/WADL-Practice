const express = require("express")
const fs = require("fs")

const app = express();

app.use(express.static('public'));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
});

app.get("/api/gallary", (req, res) => {
    fs.readFile("gallary.json", 'utf-8', (err, data) => {
        if (err)
        {
        return  res.status(500).json({ error: "Error Data Not Foound !!!" });

        }
        
            res.json(JSON.parse(data));
    });
});


app.listen(3000, () => {
    console.log("Server is Listening !!!!1");
});