const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:4200"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Mysql CURD API." });
});

require("./app/routes/posts.routes.js")(app);

// set port, listen for requests
const PORT =  5050;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
