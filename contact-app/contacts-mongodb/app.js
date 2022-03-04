const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const { check, body, validationResult } = require('express-validator');
const methodOverride = require('method-override');

// require flash
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const session = require('express-session');

require('./utils/db');
const Contact = require('./model/contacts');


const app = express();
const port = 3000;

const mahasiswa = [
    { nama: 'erik julianto', hp: 089999999, email: 'email@gmail.com' },
    { nama: 'Dwi julianto', hp: 089999999, email: 'email@gmail.com' }
];


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


// setup ejs
app.set('view engine', 'ejs'); // ejs view engine
app.use(expressLayouts); // third party middleware
app.use(express.static('public')); // Built-in middleware untuk membuka akses data difolder public
app.use(express.urlencoded( { extended: true })); // Built-in middleware parsing data dari form input

// setup method-override
app.use(methodOverride('_method'));


// Halama home
app.get('/', (req, res) => {
    res.render('index', {
        layout:'layouts/main-layout',
        title:'Halaman Home',
        mahasiswa,
    });
});

// Halaman About
app.get('/about', (req, res) => {
    res.render('about', {
        layout:'layouts/main-layout',
        title:'Halaman About',
    });
});

// Halaman Contact
app.get('/contact', async (req, res) => {
    // Contact.find().then(result => res.send(result));
    
    res.render('contact', {
        layout:'layouts/main-layout',
        title:'Halaman Contact',
        contacts: await Contact.find(),
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
        body('nama').custom( async (value) => { 
            const duplicate = await Contact.find({nama: value});
            if(duplicate.length !== 0){
                throw new Error( `nama ${value} sudah ada !` );
            }
            return true;
        }),
        check('nohp', 'No hp tidak valid').isMobilePhone('id-ID'),
        check('email', 'Email boten valid').isEmail()
    ], 
    (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
            //   return res.status(400).json({ errors: errors.array() });
                res.render('add', { 
                    layout:'layouts/main-layout',
                    title: 'Tambah contact',
                    errors: errors.array()
                })
            }else{
                new Contact(req.body).save();

                // sending flash message
                req.flash('msg', `Data contact ${req.body.nama} berhasil ditambahkan !`);
                res.redirect('/contact');
            }
});

// detail contact
app.get('/contact/:nama', async (req, res) => {
    const contact  = await Contact.findOne({nama: req.params.nama});
    res.render('detail', {
        layout:'layouts/main-layout',
        title: req.params.nama,
        contact,
    });
});


// ubah contact
app.get('/contact/edit/:nama', async (req, res) => {
    const contact = await Contact.findOne({nama: req.params.nama});
    res.render('edit', {
        layout:'layouts/main-layout',
        title: 'Ubah contact',
        contact
    });
});


// proses ubah data contact menggunakan method put
app.put('/contact', [
    body('nama').custom( async (value, {req}) => { 
        const targetContact = await Contact.findOne({ nama: value });
        if(value !== req.body.oldNama && targetContact){
            throw new Error( `nama ${value} sudah ada !` );
        }
        return true;
    }),
        check('nohp', 'No hp tidak valid').isMobilePhone('id-ID'),
        check('email', 'Email boten valid').isEmail()
    ], (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.render('edit', { 
                layout:'layouts/main-layout',
                title: 'Ubah contact',
                errors: errors.array(),
                contact: req.body,
            })
        }else{
            Contact.updateOne(
                { _id: req.body._id },
                {
                    $set: {
                        nama: req.body.nama,
                        email: req.body.email,
                        nohp: req.body.nohp,
                    }
                }).then((result) => {
                    // sending flash message
                    req.flash('msg', `Data contact ${req.body.nama} berhasil diubah !`);
                    res.redirect('/contact');
                });
            }
});



// // hapus contact dengan method delete
app.delete('/contact', async (req, res) => {
    await Contact.deleteOne({_id: req.body._id});
    // sending flash message
    req.flash('msg', `Data contact ${req.body.nama} berhasil dihapus !`);
    res.redirect('/contact');
})


// harus dibawah
app.use('/', (req, res) => {
    res.status(404);
    res.send('<h2>page not found 404</h2>');
});

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`);
})