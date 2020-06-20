const express = require("express");
const router = express.Router();

const { getCube, updateCube } = require('../controllers/cubes');
const { getAccessories } = require("../controllers/accessories")
const Accessory = require("../models/accessory");
const { authAccess , getUserStatus } = require("../controllers/user");

	router.get('/create/accessory', authAccess , getUserStatus ,  (req, res) => {
		res.render('createAccessory', {
			title: "Create accessory",
			isLoggedIn: req.isLoggedIn
		});
	});


	router.post('/create/accessory', authAccess , async (req, res) => {
		const { name, description, imageUrl } = req.body;
		const accessory = new Accessory({ name, description, imageUrl });

		await accessory.save();

   		res.render('createAccessory');

    });
    

	router.get('/attach/accessory/:id', authAccess , getUserStatus , async (req, res) => {
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
			isFullyAttached: cube.accessories.length === accessories.length,
			isLoggedIn: req.isLoggedIn
		});
	});



	router.post('/attach/accessory/:id', authAccess , async (req, res) => {
		const { accessory } = req.body;

		 await updateCube(req.params.id, accessory);
		
		res.redirect(`/details/${req.params.id}`);
	});



module.exports = router;

