const sql = require("./db.js");

// constructor
const Posts = function (post) {
  this.author = post.author;
  this.msg = post.msg;
};

Posts.create = (newPost, result) => {
  sql.query("INSERT INTO posts SET ?", newPost, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created posts: ", { id: res.insertId, ...newPost });
    result(null, { id: res.insertId, ...newPost });
  });
};

Posts.getAll = (result) => {
  let query = "SELECT * FROM posts";
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("posts: ", res);
    result(null, res);
  });
};


Posts.updateById = (id, post, result) => {
  sql.query(
    "UPDATE posts SET author = ?, msg = ?  WHERE id = ?",
    [post.author, post.msg, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Post with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated post: ", { id: id, ...post });
      result(null, { id: id, ...post });
    }
  );
};



Posts.remove = (id, result) => {
  sql.query("DELETE FROM posts WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Post with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted posts with id: ", id);
    result(null, res);
  });
};



module.exports = Posts;