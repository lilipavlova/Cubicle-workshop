const express = require('express');
const router = express.Router();

const { getAllCubes } = require('../controllers/cubes');
const { getUserStatus } = require('../controllers/user');

router.get('/', getUserStatus, async (req, res) => {
	const cubes = await getAllCubes();
	res.render('index', {
		title: 'Cube workshop',
		cubes,
		isLoggedIn: req.isLoggedIn
	});
});

router.get('/about', getUserStatus, (req, res) => {
	res.render('about', {
		title: 'About',
		isLoggedIn: req.isLoggedIn
	});
});

router.get('/logout', getUserStatus , (req, res) => {
	res.clearCookie('aid');
	res.redirect('/');
});

router.get('*', (req, res) => {
	res.render('404', {
		title: 'Page not found'
	});
});

module.exports = router;
