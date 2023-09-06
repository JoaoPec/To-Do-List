app.post("/add", async (req, res) => {

    const task = req.body.task;

    try {
        const items = await Item.find({});
        let size = items.length;
        let currentID = size + 1

        const item = new Item({
            _id: currentID,
            name: task
        });

        await item.save();

        res.render("index.ejs",{items, size })

    } catch (err) {
        console.log(err)
    }
});