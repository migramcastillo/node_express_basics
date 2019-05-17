const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const routes = require("./routes");
const path = require("path");

//Body from post request
app.use(bodyParser.urlencoded({ extended: false }))

app.set('view engine', 'ejs');
app.set('view engine', 'pug');
app.set('view engine', 'hbs');

app.use(express.static('./public'));

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/home", (req, res) => {
    res.sendFile(path.resolve("./public/index.html"));
});

app.use(routes);

app.listen(3000, () => {
    console.log("Express running on port 3000!")
});