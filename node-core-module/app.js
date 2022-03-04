// core module
// file system
const fs = require('fs');

// // menuliskan string ke file secara synchronous
// try{
//     fs.writeFileSync('data-synchronous/dataSynchronous.txt', 'menuliskan string ke file secara synchronous');
// }catch(err){
//     console.log(err);
// }


// // menuliskan isi file secara asynchronous
//     fs.writeFile('data-asynchronous/data.txt',
//      'menuliskan string ke file secara asynchronous',
//      (err) => { console.log(err) 
//     });
    
// // membaca string ke file secara synchronous
// const readFileSync = fs.readFileSync('data-synchronous/dataSynchronous.txt', 'utf-8');
// console.log(readFileSync)


// // membaca string ke file secara asynchronous
// fs.readFile('data-asynchronous/data.txt', 'utf-8',
//      (err, data) => { 
//         if(err) throw err;
//         console.log(data)
//     });


//readLine
const readLine = require('readline');
const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
});



rl.question('masukkan nama anda : ', (nama) => {
    rl.question('masukkan no telp anda : ', (tlp) => {
        const data = {
            nama, tlp
        }

        const file = fs.readFileSync('data-asynchronous/data.json', 'utf-8');
        const datas = JSON.parse(file);
        datas.push(data);
        

        fs.writeFile('data-asynchronous/data.json', JSON.stringify(datas),
        (err) => { console.log(err)  });

        console.log(datas);

    rl.close();
    });
})


