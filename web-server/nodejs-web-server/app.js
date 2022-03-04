// web server (core module nodejs)
// terminal (node app)
// browser (localhost:3000)
const http = require('http');
const fs = require('fs');
const port = 3000;

function renderHtml(path, response){
    fs.readFile(path, (err, data) => {
        if(err){
            response.writeHead(404);
            response.write('Error: file not found');
        }else{
            response.write(data);
        }
        response.end();
    });
}


http.createServer((request, response) => {
    response.writeHead(200, { 'Content-Type': 'text/html',}); // inspect - network - refresh
    
    const getUrl = request.url; // url browser
    if(getUrl ==='/about'){
        response.write('<h1>ini halaman about</h1>');
        response.end();
    }else if(getUrl ==='/profile'){        
       response.write('<h1>ini halaman profile</h1>');
       response.end();
    }else{   
        // response.write('<h1>ini halaman beranda</h1>');
        renderHtml('./index.html', response);
    }
})
.listen(port, () => {
    console.log(`server is listening on port localhost:${port} ..`);
});