
const { argv } = require('yargs');
const yargs = require('yargs');
const { simpanContact, listContact, detailContact, deleteContact } = require('./contacts');
// .command(cmd, desc,[module])
// yargs.command(
//     "add", 
//     'menambahkan contact baru',
//     () => {},
//     (argv) => {
//         console.log(argv.nama);
//     }        
// );




// menambahkan contact baru
//  node app add --nama='gogon' --email='gogon@gmail.com' --noHp='081234567'
yargs.command({
    command: 'add',
    describe: 'menambahkan contact baru',
    builder: {
        nama:{
            describe: 'Nama lengkap',
            demandOption:true,
            type: 'string',
        },
        email:{
            describe: 'Email',
            demandOption:false,
            type: 'string',
        },
        noHp:{
            describe: 'No telp',
            demandOption:true,
            type: 'string',
        },
    },
    handler:function(argv){
        const contact = {
            nama: argv.nama,
            email: argv.email,
            noHp: argv.noHp,
        }
        simpanContact(argv.nama, argv.email, argv.noHp,)
    }
}).demandCommand();


// menampilkan  semua nama & no tlp contact
// node app list
yargs.command({
    command: 'list',
    describe: 'menampilkan  semua nama & no tlp contact',
    handler() {
        listContact();
    },
});


// menampilkan  detail contact
// node app detail --nama='dwi julianto'
yargs.command({
    command: 'detail',
    describe: 'menampilkan  detail contact',
    builder: {
        nama:{
            describe: 'Nama lengkap',
            demandOption:true,
            type: 'string',
        },
    },
    handler(argv) {
        detailContact(argv.nama);
    },
});

// menghapus contact berdasarkan nama
// node app delete --nama='dwi julianto'
yargs.command({
    command: 'delete',
    describe: 'menghapus contact berdasarkan nama',
    builder: {
        nama:{
            describe: 'Nama lengkap',
            demandOption:true,
            type: 'string',
        },
    },
    handler(argv) {
        deleteContact(argv.nama);
    },
});

yargs.parse();