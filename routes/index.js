const { getAllCubes , getCube} = require('../controllers/cubes');
const Cube = require('../models/cube');

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
				console.err(err)
			} else {
			    res.redirect('/');
			}
		});
	});

	app.get('/details/:id', async (req, res) => {

		const cube = await getCube(req.params.id);

			res.render('details', {
				title: 'Details',
				cube
			});
	});

	app.get('*', (req, res) => {
		res.render('404', {
			title: 'Page not found'
		});
	});
};
