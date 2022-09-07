 const express = require('express');
 const path = require('path');
 const mongoose = require('mongoose');

 mongoose.connect('mongodb://localhost/nodekb');
 let db = mongoose.connection;


 db.on('open', function(){
   console.log('connnected to mongodb');
 })

 db.on('error', function(err){
   console.log(err);
 })

 const app = express();
 let Article = require('./models/article');
const { find } = require('./models/article');

 app.set('views', path.join(__dirname,'views'));
 app.set('view engine','pug');
 

//Home page route
 app.get('/', (req, res) => {
    
   //  let articles = [

   //    {
   //       id: 1,
   //       author: 'Cecil',
   //       title: "Article one"
   //    },
   //    {
   //       id: 2,
   //       author: 'Cecil',
   //       title: "Article two"
   //    },
   //    {
   //       id: 3,
   //       author: 'Cecil',
   //       title: "Article three"
   //    }

   //  ]  
   //res.render('index', {title: 'Articles', articles: articles});
   Article.find({},(err, articles) => {
      if(err){
         console.log(err);
        }
        else{
         res.render('index', {title: 'Articles', articles: articles});
        }
   } )
    
 })


 app.get('/article/add', (req, res) => {
    res.render('add_article', {title: "Some other theetam"});
 })



 app.listen(2200, function(){
    console.log('listening on 2200');
 })