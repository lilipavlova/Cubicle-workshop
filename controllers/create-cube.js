const Cube = require("../models/cube");

const newCube = new Cube("default", "blabla", "https://google.com", 1);

console.log(newCube);

newCube.save();