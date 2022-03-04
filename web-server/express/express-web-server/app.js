const express = require('express');
const app = express();
const port = 3000;

// http://localhost:3000
app.get('/', (req, res) =>{
    res.sendFile('./index.html', {root: __dirname});
});

// http://localhost:3000/about
app.get('/about', (req, res) =>{
    res.sendFile('./about.html', {root: __dirname});
});

// http://localhost:3000/profile
app.get('/profile', (req, res) =>{
    res.sendFile('./page-profile/profile.html', {root: __dirname});
});

// request(params)
// http://localhost:3000/product/20/category/10     (Product ID : 20 Category ID : 10)
app.get('/product/:id/category/:idCat', (req, res) =>{
    res.send(`Product ID : ${req.params.id} <br> Category ID : ${req.params.idCat}`);
});

// query
// http://localhost:3000/product/20?category=shoes     (Product ID : 20 Category ID : 10)
app.get('/product/:id', (req, res) =>{
    res.send(`Product ID : ${req.params.id} <br> Category ID : ${req.query.category}`);
});

app.get('/beranda', (req, res) =>{
    res.send('ini adalah halaman beranda');
});


app.get('/json', (req, res) =>{
    res.json({
        nama:'dwi julianto',
        email:'email@gmail.com'
    });
});


// harus dibawah
app.use('/', (req, res) => {
    res.status(404);
    res.send('<h2>page not found 404</h2>');
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  });