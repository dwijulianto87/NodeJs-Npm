const mongoose = require('mongoose');

// Membuat Schema
const Contact = mongoose.model('contact', {
    nama:{
        type:String,
        required:true,
    },
    nohp:{
        type:String,
        required:true,
    },
    email:{
        type:String,
    },
});


// const contact1 = new Contact({
//         nama: 'Dwi julianto', 
//         nohp: 089999999, 
//         email: 'dwigesoz@gmail.com' 
//     });

// contact1.save().then((contact) => console.log(contact));

module.exports = Contact;