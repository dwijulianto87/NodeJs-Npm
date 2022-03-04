const express = require('express');
const app = express();
const port = 3000;

const mahasiswa = [
    {
        nama: 'erik julianto', hp: 089999999, email: 'email@gmail.com'
    },
    {   
        nama: 'Dwi julianto', hp: 089999999, email: 'email@gmail.com'
    }
]
// ejs
app.set('view engine', 'ejs');


// http://localhost:3000
app.get('/', (req, res) =>{
    // res.sendFile('./index.html', {root: __dirname});
    res.render('index', {title: 'Home'});
});

// http://localhost:3000/about
app.get('/about', (req, res) =>{
    // res.sendFile('./about.html', {root: __dirname});
    res.render('about', {title: 'About'});
});

// http://localhost:3000/contact
app.get('/contact', (req, res) =>{
    // res.sendFile('./page-profile/profile.html', {root: __dirname});
    res.render('contact', {mahasiswa, title: 'Contact'});
});

// // request(params)
// // http://localhost:3000/product/20/category/10     (Product ID : 20 Category ID : 10)
// app.get('/product/:id/category/:idCat', (req, res) =>{
//     res.send(`Product ID : ${req.params.id} <br> Category ID : ${req.params.idCat}`);
// });

// // query
// // http://localhost:3000/product/20?category=shoes     (Product ID : 20 Category ID : 10)
// app.get('/product/:id', (req, res) =>{
//     res.send(`Product ID : ${req.params.id} <br> Category ID : ${req.query.category}`);
// });

// app.get('/beranda', (req, res) =>{
//     res.send('ini adalah halaman beranda');
// });


// app.get('/json', (req, res) =>{
//     res.json({
//         nama:'dwi julianto',
//         email:'email@gmail.com'
//     });
// });


// harus dibawah
app.use('/', (req, res) => {
    res.status(404);
    res.send('<h2>page not found 404</h2>');
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  });