const { loadContacts, findContact, addContact, deleteContact, updateContact } = require('./utils/contact');
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const { check, body, validationResult } = require('express-validator');

// require flash
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();
const port = 3000;




const mahasiswa = [
    { nama: 'erik julianto', hp: 089999999, email: 'email@gmail.com' },
    { nama: 'Dwi julianto', hp: 089999999, email: 'email@gmail.com' }
]



app.set('view engine', 'ejs'); // ejs view engine
app.use(expressLayouts); // third party middleware
app.use(express.static('public')); // Built-in middleware untuk membuka akses data difolder public
app.use(express.urlencoded( { extended: true })); // Built-in middleware parsing data dari form input

// Configuration flash
app.use(cookieParser('secret'));
app.use(
    session({
        cookie: {maxAge: 6000 },
        secret: 'secret',
        resave: true,
        saveUninitialized: true,
    })
);
app.use(flash()); // akhir configuration


// http://localhost:3000
app.get('/', (req, res) =>{
    res.render('index', {
        mahasiswa, 
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
    const contacts = loadContacts();
    res.render('contact', {
        contacts,
        layout:'layouts/main-layout',
        title: 'Contact',
        msg: req.flash('msg'),
    });
});

// Tambah data
app.get('/contact/add', (req, res) =>{
    res.render('add', {
        layout:'layouts/main-layout',
        title: 'Tambah contact'});
});


// proses tambah data contact
app.post('/contact',
    [
        body('nama').custom((value) => { 
            const duplicate = findContact(value);
            if(duplicate){
                throw new Error( `nama ${value} sudah ada !` );
            }
            return true;
        }),
        check('noHp', 'No hp tidak valid').isMobilePhone('id-ID'),
        check('email', 'Email boten valid').isEmail()
    ], (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
            //   return res.status(400).json({ errors: errors.array() });
                res.render('add', { 
                    layout:'layouts/main-layout',
                    title: 'Tambah contact',
                    errors: errors.array()
                })
            }else{
                addContact(req.body);

                // sending flash message
                req.flash('msg', `Data contact ${req.body.nama} berhasil ditambahkan !`);

                res.redirect('/contact');
                // const contacts = loadContacts();
                // res.render('contact', {
                //     contacts,
                //     layout:'layouts/main-layout',
                //     title: 'Contact'});
            }
});

// detail contact
app.get('/contact/:nama', (req, res) => {
    const contact = findContact(req.params.nama);
    res.render('detail', {
        contact,
        layout:'layouts/main-layout',
        title: req.params.nama,
    });
});

// hapus contact
app.get('/contact/delete/:nama', (req, res) => {
    const contact = findContact(req.params.nama);
    if(!contact){
        res.status(404);
        res.send('<h1>404</h1>');
    }else{
        deleteContact(req.params.nama);
        // sending flash message
        req.flash('msg', `Data contact ${req.params.nama} berhasil dihapus !`);
        res.redirect('/contact');
    }
});

// edit contact
app.get('/contact/edit/:nama', (req, res) => {
    const contact = findContact(req.params.nama)
    res.render('edit', {
        layout:'layouts/main-layout',
        title: 'Ubah contact',
        contact
    });
});

// prose ubah data
app.post('/contact/edit', [
    body('nama').custom((value, {req}) => { 
        const targetContact = findContact(value);
        if(value !== req.body.oldNama && targetContact){
            throw new Error( `nama ${value} sudah ada !` );
        }
        return true;
    }),
    check('noHp', 'No hp tidak valid').isMobilePhone('id-ID'),
    check('email', 'Email boten valid').isEmail()
], (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        //   return res.status(400).json({ errors: errors.array() });
            res.render('edit', { 
                layout:'layouts/main-layout',
                title: 'Ubah contact',
                errors: errors.array(),
                contact: req.body
            })
        }else{
            updateContact(req.body);
            // addContact(req.body);
            // // sending flash message
            req.flash('msg', `Data contact ${req.body.nama} berhasil diubah !`);
            res.redirect('/contact');
        }
});

// harus dibawah
app.use('/', (req, res) => {
    res.status(404);
    res.send('<h2>page not found 404</h2>');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});
  