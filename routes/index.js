const express = require("express");
const router = express.Router();

const { getAllCubes } = require('../controllers/cubes');



	router.get('/', async (req, res) => {
		const cubes = await getAllCubes();
			res.render('index', {
				title: 'Cube workshop',
                cubes
			});
	});

	router.get('/about', (req, res) => {
		res.render('about', {
			title: 'About'
		});
	});


	router.get('*', (req, res) => {
		res.render('404', {
			title: 'Page not found'
		});
	});


module.exports = router;
