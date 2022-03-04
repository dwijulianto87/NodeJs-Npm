const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const port = 3000;

const mahasiswa = [
    { nama: 'erik julianto', hp: 089999999, email: 'email@gmail.com' },
    { nama: 'Dwi julianto', hp: 089999999, email: 'email@gmail.com' }
]
// ejs
app.set('view engine', 'ejs');

// express-ejs-layouts
app.use(expressLayouts);

// Built-in middleware
app.use(express.static('public'));



// http://localhost:3000
app.get('/', (req, res) =>{
    res.render('index', {
        layout:'layouts/main-layout',
        title: 'Home'});
});

// http://localhost:3000/about
app.get('/about', (req, res) =>{
    res.render('about', {
        layout:'layouts/main-layout',
        title: 'About'});
});

// http://localhost:3000/contact
app.get('/contact', (req, res) =>{
    res.render('contact', {
        mahasiswa, 
        layout:'layouts/main-layout',
        title: 'Contact'});
});


// harus dibawah
app.use('/', (req, res) => {
    res.status(404);
    res.send('<h2>page not found 404</h2>');
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  });