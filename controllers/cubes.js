const Cube = require("../models/cube");


const getAllCubes = async () => {
  const cubes = await Cube.find().lean();

  if (cubes.length === 0) {
  document.getElementById("noCubesFound").style.display = "block";
  }

  return cubes;
}


const getCube = async (id) => {
  const cube = await Cube.findById(id).lean();

  return cube;
}



module.exports = {
  getAllCubes,
  getCube
}

