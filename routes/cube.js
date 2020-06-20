const express = require("express");
const router = express.Router();

const { getCubeWithAccessories } = require('../controllers/cubes');
const Cube = require('../models/cube');




router.get("/edit", (req, res) => {
    res.render("editCubePage");
});

router.get("/delete", (req, res) => {
    res.render("deleteCubePage");
});

router.get('/create', (req, res) => {
		res.render('create', {
			title: 'Create'
		});
	});

	router.post('/create', (req, res) => {
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


	router.get('/details/:id', async (req, res) => {
		const cube = await getCubeWithAccessories(req.params.id);

			res.render('details', {
				title: 'Details',
				...cube
			});
	});

	router.get('/create/accessory', (req, res) => {
		res.render('createAccessory', {
			title: "Create accessory"
		});
	});


module.exports = router;

