//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");





const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));













mongoose.connect("mongodb+srv://admin_Zaen:Rebelt5i@cluster0-lnlwz.mongodb.net/BlogListDB", { useNewUrlParser: true }, (err) =>{
  if ( err )
  {
    console.log(err);
  }
  else
  {
    console.log("connected");
    
  }
})

const blogInfoS = mongoose.Schema({
  title: String,
  nBlog: String
})
const blogInfo = mongoose.model("Blog", blogInfoS);















app.get("/", (req, res) =>{

  


  blogInfo.find({} , (err, foundResults) =>{
    if ( err)
    {
      console.log(err);
    }
    else
    {
      res.render("home.ejs" , { blgPost: foundResults} );
    }
  })
  

})

app.get("/about", (req, res) =>{
  res.render("about.ejs", {});
})

app.get("/contact", (req,res) =>{
  res.render("contact", {} );
})






app.get("/posts/:input", (req, res) =>{

  let input = req.params.input;


  blogInfo.findOne({title: input}, (err, foundResults) =>{
    if ( err )
    {
       console.log(err);
    }
    else
    {
    
      res.render("post", {Head: foundResults.title, Body: foundResults.nBlog});
    }

  })
   
})

app.get("/compose", (req, res) =>{
  res.render("compose.ejs");
})



app.post("/compose", (req, res) =>{

  

  const nBlopPost = new blogInfo({
    title: req.body.postTtl,
    nBlog: req.body.postPar
  })

  nBlopPost.save();

  
  res.redirect("/");

})


app.listen(  process.env.PORT ||  3000, function() {
  console.log("Server started on port 3000");
});
