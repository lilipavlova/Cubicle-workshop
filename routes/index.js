const { getAllCubes, getCube , updateCube , getCubeWithAccessories } = require('../controllers/cubes');
const { getAccessories } = require("../controllers/accessories")
const Cube = require('../models/cube');
const Accessory = require("../models/accessory");

module.exports = (app) => {
	app.get('/', async (req, res) => {
		const cubes = await getAllCubes();
			res.render('index', {
				title: 'Cube workshop',
                cubes
			});
	});

	app.get('/about', (req, res) => {
		res.render('about', {
			title: 'About'
		});
	});


	app.get('/create', (req, res) => {
		res.render('create', {
			title: 'Create'
		});
	});

	app.post('/create', (req, res) => {
		const { name, description, imageUrl, difficulty } = req.body;
		const cube = new Cube({ name, description, imageUrl, difficulty });

		cube.save((err) => {
			if (err) {
				console.log(err)
				res.redirect("/create")
			} else {
			    res.redirect('/');
			}
		});
	});


	app.get('/details/:id', async (req, res) => {
		const cube = await getCubeWithAccessories(req.params.id);

			res.render('details', {
				title: 'Details',
				...cube
			});
	});

	app.get('/create/accessory', (req, res) => {
		res.render('createAccessory', {
			title: "Create accessory"
		});
	});


	app.post('/create/accessory', async (req, res) => {
		const { name, description, imageUrl } = req.body;
		const accessory = new Accessory({ name, description, imageUrl });

		await accessory.save();

   		res.render('createAccessory');

	});

	app.get('/attach/accessory/:id', async (req, res) => {
		const cube = await getCube(req.params.id);
		const accessories = await getAccessories();

		const cubeAccessories = cube.accessories.map(acc => acc._id.valueOf().toString());

		const filteredAccessories = accessories.filter(acc => {
			const accessoryString = acc._id.valueOf().toString();

			return !cube.accessories.includes(accessoryString);
		})
		
		res.render('attachAccessory', {
			title: "Attach accessory",
			...cube,
			accessories: filteredAccessories,
			isFullyAttached: cube.accessories.length === accessories.length
		});
	});



	app.post('/attach/accessory/:id', async (req, res) => {
		const { accessory } = req.body;

		 await updateCube(req.params.id, accessory);
		
		res.redirect(`/details/${req.params.id}`);
	});


	app.get('*', (req, res) => {
		res.render('404', {
			title: 'Page not found'
		});
	});
};
