const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];

const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const { getCubeWithAccessories } = require('../controllers/cubes');
const Cube = require('../models/cube');

router.get('/edit', (req, res) => {
	res.render('editCubePage');
});

router.get('/delete', (req, res) => {
	res.render('deleteCubePage');
});

router.get('/create', (req, res) => {
	res.render('create', {
		title: 'Create'
	});
});

router.post('/create', (req, res) => {
	const { name, description, imageUrl, difficulty } = req.body;

	const token = req.cookies['aid'];
	const decodedObject = jwt.verify(token, config.privateKey);
 
	const cube = new Cube({ name, description, imageUrl, difficulty, creatorId: decodedObject.userId });

	cube.save((err) => {
		if (err) {
			console.log(err);
			res.redirect('/create');
		} else {
			res.redirect('/');
		}
	});
});

router.get('/details/:id', async (req, res) => {
	const cube = await getCubeWithAccessories(req.params.id);

	res.render('details', {
		title: 'Details',
		...cube
	});
});

module.exports = router;
