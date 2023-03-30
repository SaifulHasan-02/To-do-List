const express = require('express');
const bodyParser = require('body-parser');
const moongose = require("mongoose");

const date = require(__dirname + "/date.js");
const app = express();

moongose.connect("mongodb://localhost:27017/todolistDB",{useNewUrlParser : true});

const itemsSchema = {
    name : String
};

const Item = moongose.model("Item", itemsSchema);

const item1 = new Item({
    name : "Welcome to your To Do List"
})

const item2 = new Item({
    name : "Hit the Delete button"
})
const item3 = new Item({
    name : "Hit the Add button"
})

const defaultItems = [item1, item2, item3];

Item.insertMany(defaultItems)


//for ejs
app.set('view engine', 'ejs')
//for body parse
app.use(bodyParser.urlencoded({ extended: false }))

//for css file
app.use(express.static("public"));

// var items = ["Buy Food", "Cook Food", "Eat Food"];
var workItems = [];

app.get("/", async function(req, res){
    
    // const day = date.getDate();
    // const day = date.getDay();
    const foundItems = await Item.find({})
    
    res.render('list', {listTitle : "Today", newListItems : foundItems}); 

})

app.post("/", function(req, res){
    var item = req.body.newItem;
    if(req.body.list == "Work"){
        workItems.push(item);
        res.redirect("/work")
    }else{
        items.push(item)
        res.redirect("/");
    } 
})

app.get("/work", function(req, res){
    res.render("list",{listTitle : "Work List", newListItems : workItems})
})
app.post("/work", function(req, res){
    var item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work");
})

app.get("/about", function(req, res){
    res.render("about")
})
app.listen(3000, function(req, res){
    console.log("Server is listening");
})