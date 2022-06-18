const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/petshelterdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Established a connection to Pet Shelter DB"))
  .catch((err) => console.log("Something went wrong connecting to DB", err));
