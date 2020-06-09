const { getAllCubes} = require("../controllers/cubes")
const { getCube } = require("../controllers/database")

module.exports = (app) => {
    
    app.get("/", (req, res) => {
        getAllCubes(cubes => {
                res.render("index", {
                title: "Cube workshop",
                cubes
                });
            })
        })

        app.get("/about", (req, res) => {
            res.render("about", {
                title: "About"
        });
        })
    
        app.get("/create", (req, res) => {
            res.render("create", {
            title: "Create"
        });
        })
    
    app.get("/details/:id", (req, res) => {
        getCube(req.params.id, (cube) => {
            res.render("details", {
                title: "Details",
                cube
            });
            })
        })
    
        app.get("*", (req, res) => {
            res.render("404", {
            title: "Page not found"
        });
    })
};