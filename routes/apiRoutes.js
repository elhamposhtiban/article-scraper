
const express = require ("express");
const axios = require ("axios");
const cheerio = require ("cheerio");
const mongoose = require("mongoose");
const db = require ("../models");

module.exports = function (app) {


    app.get ("/scrape", function (req, res){
        axios.get("https://www.newsweek.com/").then (function(response){
            const $ = cheerio.load(response.data);
    
            $("article.clearfix").each (function (i, element) {

                 // Save an empty result object
    
                let result = {};

                 // Add the text, summary, image and href of every link, and save them as properties of the result object
                result.title = $(element).children("h4").children("a").text();
                result.link = $(element).children("h4").children("a").attr("href");
                result.image = $(element).children(".image").children("a").children("picture.mapping-sm_thumb").attr("src")
                result.summary = $(element).children(".summary").text();

                console.log(result)
    
               db.Article.create(result)
               .then( function(dbArticle) {

                 console.log(dbArticle)

               })
              .catch(function (err) {
                console.log(err)
               })
              
            });
        });
        res.send("it is working !! yeaa")
    });


    // Route for getting  Articles that is not saved from the db
    app.get("/articles", function(req, res) {

    db.Article.find({saved: false})
        .then(function(dbArticle) {
            // console.log(dbArticle)
        
        res.json(dbArticle);
        })
        .catch(function(err) {
        
        res.json(err);
        });
    });

    // Route for getting  Articles that is saved from the db
    app.get("/articles/saved", function(req, res) {

        db.Article.find({saved: true})
            .then(function(dbArticle) {
            
            res.json(dbArticle);
            })
            .catch(function(err) {
            
            res.json(err);
            });
        });

  // update articles here save : true
    app.get("/articles/saved/:id", function(req, res) {
        
        db.Article.findOneAndUpdate
        (
            { _id: req.params.id },
            {
                $set: {
                    saved:true}
                 })
    
        .then(function(dbArticle) {
        
            res.json(dbArticle);
        })
        .catch(function(err) {
            
            res.json(err);
        });
    });

      // update articles here save : false
      app.get("/articles/unsaved/:id", function(req, res) {
        
        db.Article.findOneAndUpdate
        (
            { _id: req.params.id },
            {
                $set: {
                    saved:false}
                 })
    
        .then(function(dbArticle) {
        
            res.json(dbArticle);
        })
        .catch(function(err) {
            
            res.json(err);
        });
    });

    app.get("/articles/:id", function(req, res) {
    
        db.Article.findOne({ _id: req.params.id })
         
          .populate("note")
          .then(function(dbArticle) {
           
            res.json(dbArticle);
          })
          .catch(function(err) {
            
            res.json(err);
          });
      });
      
    
    // Route for saving/updating an Article's associated Note
    app.post("/articles/:id", function(req, res) {
        
        db.Note.create(req.body)

        .then(function(dbNote) {

            return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
        })
        .then(function(dbArticle) {
            // If we were able to successfully update an Article, send it back to the client
            res.json(dbArticle);
        })
        .catch(function(err) {
            // If an error occurred, send it to the client
            res.json(err);
        });
    });

    app.delete("/articles", function (req, res) {
        db.Article.deleteMany({})
          .then(function (dbArticle) {
      
            res.json(dbArticle);
          })
          .catch(function (err) {
      
            res.json(err);
          });
      
      });
      
      app.delete("/note/:id", function (req, res) {
        db.Note.deleteOne({
            _id: req.params.id
          })
          .then(function (dbNote) {
      
            res.json(dbNote);
          })
          .catch(function (err) {
      
            res.json(err);
          });
      
      });



}



