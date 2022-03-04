
// core module
// file system
const fs = require('fs');


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

const loadContacts = () =>{
    const file = fs.readFileSync(filePath, 'utf-8');
    const datas = JSON.parse(file);

    return datas;
}

const addContact = (newContact) => {
    const contacts = loadContacts();
    contacts.push(newContact);
    refreshContact(contacts);
}

const refreshContact = (contacts) => {
    fs.writeFileSync(filePath, JSON.stringify(contacts));
}
const findContact = (nama) => {
    const contact = loadContacts().find((cont) => cont.nama === nama);
    return contact;
};




const deleteContact = (nama) => {
    const contacts = loadContacts();
    const newContacts = contacts.filter((cont) => cont.nama != nama);
    refreshContact(newContacts);
}

const updateContact = (editContact) => {
    deleteContact(editContact.oldNama);
    delete editContact.oldNama; // hapus properti object
    addContact(editContact);
    
}
module.exports = { loadContacts, findContact, addContact, deleteContact, updateContact };