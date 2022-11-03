const PostModel = require("../models/post.model.js");

// Create and Save a new post
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a post
    const post = new PostModel({
        author: req.body.author,
        msg: req.body.msg
    });

    // Save post in the database
    PostModel.create(post, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the post."
            });
        else res.send(data);
    });
};
// Retrieve all posts from the database.
exports.findAll = (req, res) => {
   
  
    PostModel.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      else res.send(data);
    });
  };

// Update a post identified by the id in the request

exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
    console.log(req.body);
  
    PostModel.updateById(
      req.params.id,
      new PostModel(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Posts with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Posts with id " + req.params.id
            });
          }
        } else res.send(data);
      }
    );
  };


// Delete a post with the specified id in the request
exports.delete = (req, res) => {
    PostModel.remove(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Post with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Post with id " + req.params.id
          });
        }
      } else res.send({ message: `Post was deleted successfully!` });
    });
  };

