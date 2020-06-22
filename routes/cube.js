const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];

const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const { getCubeWithAccessories , editCube } = require('../controllers/cubes');
const Cube = require('../models/cube');
const { authAccess , getUserStatus } = require("../controllers/user");



router.get('/edit', authAccess , getUserStatus , (req, res) => {
	res.render('editCubePage', {
		isLoggedIn: req.isLoggedIn
	});
});

router.get('/delete', authAccess , getUserStatus , (req, res) => {
	res.render('deleteCubePage', {
		isLoggedIn: req.isLoggedIn
	});
});

router.get('/create', authAccess , getUserStatus , (req, res) => {
	res.render('create', {
		title: 'Create',
		isLoggedIn: req.isLoggedIn
	});
});

router.post('/create' , authAccess , (req, res) => {
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

router.get('/details/:id' , getUserStatus ,  async (req, res) => {
	const cube = await getCubeWithAccessories(req.params.id);

	res.render('details', {
		title: 'Details',
		...cube,
		isLoggedIn: req.isLoggedIn
	});
});

router.get('/edit/:id' , getUserStatus ,  async (req, res) => {
	const cube = await getCubeWithAccessories(req.params.id);

	res.render('editCubePage', {
		title: 'Edit',
		...cube,
		isLoggedIn: req.isLoggedIn
	});
});

router.post('/edit/:id', authAccess , async (req, res) => {
	const { name, description, imageUrl, difficulty } = req.body;

	await editCube(req.params.id,  { name, description, imageUrl, difficulty } );
		
	res.redirect(`/details/${req.params.id}`);
});




module.exports = router;
