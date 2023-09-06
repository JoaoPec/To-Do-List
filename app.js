const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
const PORT = 3000;


app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/todolistDB", { useNewUrlParser: true });

const itemsSchema = {
    name: {
        type: String,
        required: [true, "Please check your data entry, no name specified!"]
    },
    _id: {
        type: Number,
        required: [true, "Please check your data entry, no id specified!"]
    }
}

const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({
    _id: 1,
    name: "Study Web Development"
})

const item2 = new Item({
    _id: 2,
    name: "Study Java Exceptions"
})

const item3 = new Item({
    _id: 3,
    name: "Study Mongoose"
})

const item4 = new Item({
    _id: 4,
    name: "Have a good night sleep"
})

const defaultItems = [item3,item2,item4,item1];


app.listen(PORT, () => {
    console.log("http://localhost:3000");
});

app.get("/", async (req, res) => {

    const items = await Item.find({});
    let size = items.length;

    if (size < 4) {
        Item.insertMany(defaultItems)
            .then(() => {
                console.log("Successfully saved all the items to the database");
            }).catch((err) => {
                console.log(err);
            });
        res.render("index.ejs", { items: defaultItems, size: 4 });
    } else {
        res.render("index.ejs", { items, size });
    } 
});

app.post("/add", async (req, res) => {

    const task = req.body.task;

    try {
        const items = await Item.find({});
        let size = items.length;
        let currentID = size + 1;

        const item = new Item({
            _id: currentID,
            name: task
        });

        await item.save();

        // Log todos os itens
        console.log("Todos os itens da lista:");
        items.forEach((item) => {
            console.log(`ID: ${item._id}, Nome: ${item.name}`);
        });

        res.redirect("/");
    } catch (err) {
        console.log(err);
    }
});

app.post("/delete", (req, res) => {

    const id = req.body.taskId
    
    Item.deleteOne({ _id: id })
        .then(() => {
            console.log("Successfully deleted the item from the database");
        }).catch((err) => {
            console.log(err);
        });
    res.redirect("/")
})

