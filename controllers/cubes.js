const Cube = require('../models/cube');

const getAllCubes = async () => {
	const cubes = await Cube.find().lean();

	return cubes;
};

const getCube = async (id) => {
	const cube = await Cube.findById(id).lean();

	return cube;
};

const getCubeWithAccessories = async (id) => {
	const cube = await Cube.findById(id).populate('accessories').lean();

	return cube;
};

const updateCube = async (cubeId, accessoryId) => {
	await Cube.findByIdAndUpdate(cubeId, {
		$addToSet: { accessories: [ accessoryId ] }
	});
};

const editCube = async (cubeId, newData) => {
	await Cube.findByIdAndUpdate(
		{ _id: cubeId },
		{
			name: newData.name,
			description: newData.description,
			imageUrl: newData.imageUrl,
			difficulty: newData.difficulty
		}
	);
};

module.exports = {
	getAllCubes,
	getCube,
	updateCube,
	getCubeWithAccessories,
	editCube
};
