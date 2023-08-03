//jshint esversion:6
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

let items = [];
let workItems = [];

app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

app.get('/', function(req, res){
    let today = new Date();

    let options = { weekday: 'long', year: 'numeric', month: 'long', day:'numeric' };

    let day = today.toLocaleDateString('en-US', options);

    res.render('list',{listTitle:day, newListItems:items});
    
});

app.post("/", function(req, res){
    //console.log(req.body.newItem);
    let item = req.body.newItem;

    if (req.body.list === "Work"){
        workItems.push(item);
        res.redirect('/work');
    }
    else{
        items.push(item);
        res.redirect('/');
    }    
});

app.get('/work', function(req, res){
    res.render("list",{listTitle:"Work List", newListItems:workItems});
});

app.get('/about', function(req, res){
res.render("about");
});

app.listen(process.env.PORT || 3000, function(){
    console.log("Server is running on port 3000");
});
