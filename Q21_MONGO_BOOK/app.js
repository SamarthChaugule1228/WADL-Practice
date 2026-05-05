import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/BookInfo")
    .then(() => console.log("Mongo Connected !!!"))
    .catch(() => console.log("Connection Error"));


// Schema
const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    price: Number,
    genre: String
});

const Book = mongoose.model("Book", bookSchema);


//////////////////////////////////////////////////////////////////
// 1) ADD BOOK (USING URL)
//////////////////////////////////////////////////////////////////
app.get("/add", async (req, res) => {
    const { title, author, price, genre } = req.query;

    const book = new Book({ title, author, price, genre });
    await book.save();

    res.send("Book Added Successfully");
});

/*
👉 TEST:
http://localhost:3000/add?title=AtomicHabits&author=JamesClear&price=500&genre=SelfHelp
*/


//////////////////////////////////////////////////////////////////
// 2) VIEW ALL BOOKS
//////////////////////////////////////////////////////////////////
app.get("/view", async (req, res) => {
    const data = await Book.find();
    res.send(data);
});

/*
👉 TEST:
http://localhost:3000/view
*/


//////////////////////////////////////////////////////////////////
// 3) UPDATE BOOK (USING URL)
//////////////////////////////////////////////////////////////////
app.get("/update", async (req, res) => {
    const { title, price } = req.query;

    await Book.updateOne(
        { title: title },
        { $set: { price: price } }
    );

    res.send("Book Updated Successfully");
});

/*
👉 TEST:
http://localhost:3000/update?title=AtomicHabits&price=600
*/


//////////////////////////////////////////////////////////////////
// 4) DELETE BOOK (USING URL)
//////////////////////////////////////////////////////////////////
app.get("/delete/:title", async (req, res) => {
    await Book.deleteOne({ title: req.params.title });
    res.send("Book Deleted Successfully");
});

/*
👉 TEST:
http://localhost:3000/delete/AtomicHabits
*/


//////////////////////////////////////////////////////////////////

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});