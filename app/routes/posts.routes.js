module.exports = app => {
    const posts = require("../controllers/posts.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Post
    router.post("/", posts.create);
  
    // Retrieve all posts
    router.get("/", posts.findAll);
  
 
    // Update a Post with id
    router.put("/:id", posts.update);
  
    // Delete a Post with id
    router.delete("/:id", posts.delete);
  
 
    app.use('/api/post', router);
  };