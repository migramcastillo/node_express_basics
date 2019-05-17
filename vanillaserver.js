//Example of vanilla http server
const http = require('http');
const fs = require('fs');
const url = require('url');

http.createServer(function (req, res) {

    const requestUrl = url.parse(req.url).pathname;
    const method = req.method;

    switch (requestUrl) {
        case "/":
            if(method == "GET"){
                res.writeHead(200, {
                    'Content-Type': 'application/json'
                });
            
                const result = {
                    message: "Welcome to Xcaret"
                };
            
                res.write(JSON.stringify(result));
            
                return res.end();
            }
            break;
        case "/home":
            if(method == "GET"){
                res.writeHead(200, {
                    'Content-Type': 'text/html'
                });

                fs.readFile("./home.html", function(err, html){
                    if(err) throw err;

                    res.write(html);

                    return res.end();
                });
            }
            break;
        default:
            res.writeHead(404, {
                'Content-Type': 'text/html'
            });

            res.write("Not found");
            
            return res.end();
    }
}).listen(3000, (err) => {
    if(err) return console.log("Error on server", err);

    console.log("Server listening at port: ", 3000);
});