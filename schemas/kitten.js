const mongoose = require("mongoose");

const kittenSchema = mongoose.Schema({
  name: String,
});

kittenSchema.methods.speak = function () {
  const greeting = this.name
    ? "Meow name is " + this.name
    : "I don't have a name";
  console.log(greeting);
};

const Kitten = mongoose.model("Kitten", kittenSchema);

module.exports = Kitten;
