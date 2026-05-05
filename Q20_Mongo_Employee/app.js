import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // ✅ important for URL/form
app.use(express.static('public'));
app.use(cors());


// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/Employee")
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log("Mongo Error:", err));


// Schema
const employeeSchema = new mongoose.Schema({
    name: String,
    department: String,
    designation: String,
    salary: Number,
    joining_date: String,
});


// Model
const Employee = mongoose.model("employee_info", employeeSchema);


//////////////////////////////////////////////////////////////////
// 1. ADD Employee (POST)
//////////////////////////////////////////////////////////////////
app.post("/api/add", async (req, res) => {
    try {
        const newemployee = new Employee(req.body);
        await newemployee.save();
        res.json({ msg: "Employee Added", data: newemployee });
    } catch (err) {
        res.status(500).json({ error: "Add Failed" });
    }
});

/*
👉 Test (Postman / fetch)

POST http://localhost:3000/api/add

Body (JSON):
{
  "name": "Samarth",
  "department": "IT",
  "designation": "Developer",
  "salary": 50000,
  "joining_date": "2026-05-05"
}
*/


//////////////////////////////////////////////////////////////////
// 2. DISPLAY Employees (GET)
//////////////////////////////////////////////////////////////////
app.get("/api/display", async (req, res) => {
    try {
        const data = await Employee.find();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: "Fetch Failed" });
    }
});

/*
👉 Test in browser:
http://localhost:3000/api/display
*/


//////////////////////////////////////////////////////////////////
// 3. DELETE Employee (DELETE)
//////////////////////////////////////////////////////////////////
app.delete("/api/delete/:name", async (req, res) => {
    try {
        const delname = req.params.name;
        await Employee.deleteOne({ name: delname });

        res.json({ msg: "Employee Deleted" });
    } catch (err) {
        res.status(500).json({ error: "Delete Failed" });
    }
});

/*
👉 Test (Postman)

DELETE http://localhost:3000/api/delete/Samarth
*/


//////////////////////////////////////////////////////////////////
// 4. UPDATE Employee (PUT)
//////////////////////////////////////////////////////////////////
app.put("/api/update/:name", async (req, res) => {
    try {
        const name = req.params.name;

        await Employee.updateOne(
            { name: name },
            { $set: req.body }
        );

        res.json({ msg: "Employee Updated" });
    } catch (err) {
        res.status(500).json({ error: "Update Failed" });
    }
});

/*
👉 Test (Postman)

PUT http://localhost:3000/api/update/Samarth

Body:
{
  "salary": 70000,
  "designation": "Senior Developer"
}
*/


//////////////////////////////////////////////////////////////////
// OPTIONAL (EXAM TRICK 🔥) → ADD USING URL
//////////////////////////////////////////////////////////////////
app.get("/api/addurl", async (req, res) => {
    const { name, department, designation, salary, joining_date } = req.query;

    const emp = new Employee({
        name,
        department,
        designation,
        salary,
        joining_date
    });

    await emp.save();

    res.json({ msg: "Added via URL", data: emp });
});

/*
👉 Test in browser:

http://localhost:3000/api/addurl?name=Rahul&department=HR&designation=Manager&salary=40000&joining_date=2026-05-05
*/


//////////////////////////////////////////////////////////////////

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});