const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

let tasks = []; 

app.listen(PORT, () => {
    console.log("http://localhost:3000");
});

app.get("/", (req, res) => {
    res.render("index.ejs", { tasks });
});

app.post("/add", (req, res) => {
    const task = req.body.task;
    console.log(task);
    tasks.push(task);
    console.log(tasks);
    res.render("index.ejs", { tasks }); 
});


