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

const defaultItems = [item1, item2, item3, item4];

const customListSchema = {
    name: String,
    items: [itemsSchema]
}

const List = new mongoose.model("List", customListSchema);


app.listen(PORT, () => {
    console.log("http://localhost:3000");
});

app.get("/", async (req, res) => {

    const items = await Item.find({});
    let size = items.length;

    if (size === 0) {
        Item.insertMany(defaultItems)
            .then(() => {
                console.log("Successfully saved all the items to the database");
            }).catch((err) => {
                console.log(err);
            });
        res.render("index.ejs", { items: defaultItems, size: 4, listTitle: "Today" });
    } else {
        res.render("index.ejs", { items, size, listTitle: "Today" });
    }
});

app.get("/:customList", async (req, res) => {

    const customList = req.params.customList;

    try {
        const list = await List.findOne({ name: customList });
        if (list) {
            console.log(list);
            res.render("index.ejs", { listTitle: list.name, size: list.length, items: list.items });
        } else {
            const newList = new List({
                name: customList,
                items: defaultItems
            });
            await newList.save();
            console.log(newList);
            res.redirect("/" + customList)
        }
    } catch (err) {
        console.log(err);
    }
});

app.post("/", async (req, res) => {

    const task = req.body.task;
    const list = req.body.list;
    if (list === "Today") {
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
    } else {
        try {
            const listFound = await List.findOne({ name: list });
            let size = listFound.items.length;
            let currentID = size + 1;

            const item = new Item({
                _id: currentID,
                name: task
            });

            await listFound.items.push(item);
            await listFound.save();

            res.redirect("/" + list);
        } catch (err) {
            console.log(err);
        }
    }
})

app.post("/delete", (req, res) => {

    const id = req.body.taskId

    const list = req.body.listName.trim();

    if (list === "Today") {
        Item.deleteOne({ _id: id })
            .then(() => {
                console.log("Successfully deleted the item from the database");
            })
            .catch((err) => {
                console.log(err);
            });

        res.redirect("/");
    } else {
        List.findOneAndUpdate({ name: list }, { $pull: { items: { _id: id } } })
            .then((foundList)=> {
                console.log("Successfully deleted the item from the database");
        }).catch((err) => {
            console.log(err);
        });
       
        res.redirect("/" + list)
    }
});