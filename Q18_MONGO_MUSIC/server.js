const express = require("express");
const mongoose = require("mongoose");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Schema
const songSchema = new mongoose.Schema({
    songName: String,
    filmName: String,
    musicDirector: String,
    singer: String,
    actor: String,
    actress: String
});

const Song = mongoose.model("Song", songSchema);

// a) Create DB + connect
mongoose.connect("mongodb://127.0.0.1:27017/music")
    .then(() => console.log("MongoDB Connected"))
    .catch(() => console.log("MongoDB Error"));


// c) Insert 5 songs
app.get("/insert", async (req, res) => {
    const data = await Song.insertMany([
        { songName: "Tum Hi Ho", filmName: "Aashiqui 2", musicDirector: "Mithoon", singer: "Arijit Singh" },
        { songName: "Malang", filmName: "Dhoom 3", musicDirector: "Pritam", singer: "Siddharth Mahadevan" },
        { songName: "Kal Ho Na Ho", filmName: "KHNH", musicDirector: "Shankar", singer: "Sonu Nigam" },
        { songName: "Channa Mereya", filmName: "ADHM", musicDirector: "Pritam", singer: "Arijit Singh" },
        { songName: "Kesariya", filmName: "Brahmastra", musicDirector: "Pritam", singer: "Arijit Singh" }
    ]);
    res.json({ message: "Inserted", data });
});


// d) Total count + list
app.get("/all", async (req, res) => {
    const songs = await Song.find();
    res.json({ total: songs.length, data: songs });
});


// e) Songs by Music Director
app.get("/director/:name", async (req, res) => {
    const data = await Song.find({ musicDirector: req.params.name });
    res.json(data);
});


// f) Songs by Director + Singer
app.get("/filter", async (req, res) => {
    const { director, singer } = req.query;

    const data = await Song.find({
        musicDirector: director,
        singer: singer
    });

    res.json(data);
});


// g) Delete song
app.delete("/delete/:name", async (req, res) => {
    await Song.deleteOne({ songName: req.params.name });
    res.json({ message: "Deleted Successfully" });
});


// h) Add new song
app.post("/add", async (req, res) => {
    const song = new Song(req.body);
    await song.save();
    res.json({ message: "Song Added", data: song });
});


// i) Songs by Film + Singer
app.get("/search", async (req, res) => {
    const { film, singer } = req.query;

    const data = await Song.find({
        filmName: film,
        singer: singer
    });

    res.json(data);
});


// j) Update actor & actress
app.put("/update/:name", async (req, res) => {
    await Song.updateOne(
        { songName: req.params.name },
        { actor: "Ranveer Singh", actress: "Shrileela" }
    );
    res.json({ message: "Updated Successfully" });
});


// k) HTML TABLE DISPLAY
app.get("/table", async (req, res) => {
    const songs = await Song.find();

    let html = `
    <html>
    <head>
        <title>Song Table</title>
        <style>
            table { border-collapse: collapse; width: 80%; margin: auto; }
            th, td { border: 1px solid black; padding: 10px; text-align: center; }
            th { background-color: #ddd; }
        </style>
    </head>
    <body>
        <h2 style="text-align:center;">Song Details</h2>
        <table>
            <tr>
                <th>Song Name</th>
                <th>Film Name</th>
                <th>Music Director</th>
                <th>Singer</th>
                <th>Actor</th>
                <th>Actress</th>
            </tr>
    `;

    songs.forEach(s => {
        html += `
            <tr>
                <td>${s.songName}</td>
                <td>${s.filmName}</td>
                <td>${s.musicDirector}</td>
                <td>${s.singer}</td>
                <td>${s.actor || "-"}</td>
                <td>${s.actress || "-"}</td>
            </tr>
        `;
    });

    html += `
        </table>
    </body>
    </html>
    `;

    res.send(html);
});


// Server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});