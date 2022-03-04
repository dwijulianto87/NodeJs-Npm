
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


//readLine
const readLine = require('readline');
const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
});

function pertanyaan(tanya){
    return new Promise((resolve, reject) => {
         rl.question(tanya , (nama) => { 
             resolve (nama);
         });
        });
}

function simpanContact( nama, email, tlp ){
    const data = { nama, email, tlp}
    const file = fs.readFileSync(filePath, 'utf-8');
    const datas = JSON.parse(file);
    datas.push(data);

    const updateData = JSON.stringify(datas)
    fs.writeFileSync(filePath, updateData)
    
    rl.close()
    console.log(updateData)
}

module.exports = { simpanContact, pertanyaan };