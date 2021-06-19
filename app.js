const express = require("express");
const mongoose = require("mongoose");
const app = express();
var bodyParser = require('body-parser'); 
const ejs = require("ejs");
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

mongoose.connect('mongodb+srv://kartikey_jadoun:thakur1239@cluster0.pa6nc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority/task', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set("useCreateIndex",true);

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}

const pesonSchema = new mongoose.Schema({
    name: String,
    location: String
  });

  const Person = mongoose.model('Person', pesonSchema);


app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/views/index.html");
})

app.post("/",(req,res)=>{
    const name = req.body.name;
    const location = req.body.location;
    const person = new Person({name:name,location:location});
    person.save((err)=>{
        if (err) return console.error(err);
    })
    res.redirect("/");
})

app.get("/info",(req,res)=>{
    Person.find({}, function (err, users) {
        res.render("info",{user: users});
    });
})

app.listen(port,(req,res)=>{
    console.log("server is running")
})