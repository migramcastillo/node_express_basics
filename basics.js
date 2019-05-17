console.log("Starting basics script");

process.env.UV_THREADPOOL_SIZE = 4;

const crypto = require("crypto");
const fs = require("fs");
const https = require("https");
const start = Date.now();

//I don't care, I'm a OS operation
https.get("https://www.google.com", (res) => {
    console.log("Reading google on: ", Date.now() - start);
});

// Asynchronous request, what will show first?
fs.readFile("./home.html", (err, data) => {
    if(err) throw new Error(err);

    console.log("FS:", Date.now() - start);
});

for (let index = 1; index <= 4; index++) {
    crypto.pbkdf2('mypassword', 'mysalt', 100000, 512, 'sha512', () => {
        console.log(`Crypto ${index}: `, Date.now() - start);
    });
}