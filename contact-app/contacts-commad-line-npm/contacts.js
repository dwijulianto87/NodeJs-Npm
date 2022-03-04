
// core module
// file system
const fs = require('fs');
const validator = require('validator');
const chalk = require('chalk');


// membuat folder baru jika belum ada
const dirPath = './data';
if(!fs.existsSync(dirPath)){
    fs.mkdirSync(dirPath);
}


// membuat file.json baru jika belum ada
const filePath = './data/contacts.json';
if(!fs.existsSync(filePath)){
    fs.writeFileSync(filePath, '[]', 'utf-8');
}

const loadContact = () =>{
    const file = fs.readFileSync(filePath, 'utf-8');
    const datas = JSON.parse(file);

    return datas;
}

function updateContact(datas){    
    const updateData = JSON.stringify(datas)
    fs.writeFileSync(filePath, updateData);
}





// menambahkan contact
function simpanContact( nama, email, tlp ){
    const data = { nama, email, tlp};
    // const file = fs.readFileSync(filePath, 'utf-8');
    // const datas = JSON.parse(file);
    const datas = loadContact();

    // check duplikat
    const duplicate = datas.find((data) => data.nama === nama);
    if(duplicate){
        console.log(chalk.red.inverse.bold(`data contact ${nama} sudah ada`));
        return false;
    }

    // check email
    if(email){
        if(!validator.isEmail(email)){
            console.log(`email ${email} tidak valid`)
            return false;
        }
    }

    // check no hp
    if(tlp){
        if(!validator.isMobilePhone(tlp, 'id-ID')){
            console.log(`nomor tlp ${tlp} tidak valid, gunakan awalan +628/ 08`)
            return false;
        }
    }

    console.log(`contact dengan nama ${nama} berhasil ditambahkan`);
    datas.push(data);
    updateContact(datas)
}


// menampilkan list contact
const listContact = () =>{
    const datas = loadContact();

    console.log(chalk.red.inverse.bold(`daftar data contact :`));
    datas.forEach((item, i ) => {
        console.log(`${i + 1}. ${item.nama} - ${item.tlp}`)
    });
}

// detail contact
const detailContact = (nama) => {
    const datas = loadContact();
    const contact = datas.find((contact) => 
        contact.nama.toLowerCase() === nama.toLowerCase()
    );

    if(!contact){
        console.log(chalk.red.inverse.bold(`${nama} tidak ditemukan`));
        return false;
    }

    
    console.log(chalk.green.inverse.bold(contact.nama));
    if(contact.email){
        console.log(contact.email);
    }
    console.log(contact.tlp);
};


// delete contact
const deleteContact = (nama) => {
    const datas = loadContact();
    
    const newContact = datas.filter((contact) => 
        contact.nama.toLowerCase() !== nama.toLowerCase()
    );

    if(datas.length === newContact.length){
        console.log(chalk.green.inverse.bold(`${nama} tidak ditemukan `));
        return false;
    }
    console.log(chalk.green.inverse.bold(`${nama} berhasil dihapus `));
    updateContact(newContact);
};

module.exports = { simpanContact, listContact, detailContact, deleteContact };