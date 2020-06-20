const express = require("express");
const router = express.Router();
const { saveUser , verifyUser , guestAccess , getUserStatus } = require("../controllers/user");


// Registration Routs 
router.get("/register", guestAccess , getUserStatus , (req, res) => {
    res.render("registerPage", {
        isLoggedIn: req.isLoggedIn
    });
});

router.post("/register", async (req, res) => {
    const status = await saveUser(req, res);

    if (status) {
        res.redirect("/")
    };
});

// Login Routs
router.get("/login", guestAccess , getUserStatus , (req, res) => {
    res.render("loginPage", {
        
    });
});

router.post("/login" , async (req, res) => {
    const status = await verifyUser(req, res);

    if (status) {
        res.redirect("/")
    } 
});



module.exports = router;

