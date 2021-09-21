const http = require('http');

const port = process.env.PORT || 3001 ;

const server = http.createServer(function(req,res){
    res.end("Hi Bootcamp");
})

server.listen(port);

console.log(`Server Listening on Port ${port}`);