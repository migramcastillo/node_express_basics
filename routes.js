const express = require("express");
const router = express.Router();

router.get("/handlebars", (req, res) => {
    res.render('home.hbs', {
        title: "Welcome to handlebars",
        h1: "You're using handlebars"
    });
});

router.get("/pug", (req, res) => {
    res.render('home.pug', {
        title: "Welcome to pug",
        h1: "You're using pug"
    });
});

router.get("/ejs", (req, res) => {
    res.render('home.ejs', {
        title: "Welcome to ejs",
        h1: "You're using ejs"
    });
});

module.exports = router;