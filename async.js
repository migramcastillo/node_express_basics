console.log("Starting basics script");

process.env.UV_THREADPOOL_SIZE = 4;

const crypto = require("crypto");
const fs = require("fs");
const https = require("https");


const start = Date.now();

//First async-await rule, all await must be inside an async function
(async () => {
    const result = await https.get("https://www.google.com");
    console.log("Http async ", Date.now() - start);

    const file = await fs.readFileSync("./home.html");
    console.log("File async ", Date.now() - start);

    for (let index = 1; index <= 4; index++) {
        const cryptoResult = await crypto.pbkdf2Sync('mypassword', 'mysalt', 100000, 512, 'sha512');
        console.log(`Crypto ${index}: `, Date.now() - start);
    }
})();