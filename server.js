const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const routes = require("./routes");
const path = require("path");

const crypto = require("crypto");
const fs = require("fs");
const https = require("https");

//Body from post request
app.use(bodyParser.urlencoded({ extended: false }))

app.set('view engine', 'ejs');
app.set('view engine', 'pug');
app.set('view engine', 'hbs');

app.use(express.static('./public'));

app.get("/async", (req, res) => {

    let operations = 8;
    const start = Date.now();

    const asyncHandler = () => {
        operations--;

        if(operations === 0){
            return res.send(`Hello World! on ${Date.now() - start}`);
        }
    };

    //I don't care, I'm a OS operation
    https.get("https://www.google.com", (res) => {
        console.log("Reading google on: ", Date.now() - start);
        asyncHandler();
    });

    // Asynchronous request, what will show first?
    fs.readFile("./home.html", (err, data) => {
        if(err) throw new Error(err);

        console.log("FS:", Date.now() - start);
        asyncHandler();
    });

    for (let index = 1; index <= 6; index++) {
        crypto.pbkdf2('mypassword', 'mysalt', 100000, 512, 'sha512', () => {
            console.log(`Crypto ${index}: `, Date.now() - start);
            asyncHandler();
        });
    }
});

app.get("/sync", (req, res) => {
    (async (callback) => {
        const start = Date.now();

        const result = await https.get("https://www.google.com");
        console.log("Http async ", Date.now() - start);
    
        const file = await fs.readFileSync("./home.html");
        console.log("File async ", Date.now() - start);
    
        for (let index = 1; index <= 4; index++) {
            const cryptoResult = await crypto.pbkdf2Sync('mypassword', 'mysalt', 100000, 512, 'sha512');
            console.log(`Crypto ${index}: `, Date.now() - start);
        }
        callback(start);
    })((initTime) => {
        return res.send(`Hello World! on ${Date.now() - initTime}`);
    });
});

app.get("/home", (req, res) => {
    res.sendFile(path.resolve("./public/home.html"));
});

app.use(routes);

app.listen(3000, () => {
    console.log("Express running on port 3000!")
});