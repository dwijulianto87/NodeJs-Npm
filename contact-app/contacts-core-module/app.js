// local module
const { simpanContact, pertanyaan } = require('./contacts');   



async function main(){
    const nama = await pertanyaan('masukan nama anda : ');
    const email = await pertanyaan('masukan email anda : ');
    const tlp = await pertanyaan('masukan nomer telp anda : ');

    simpanContact( nama, email, tlp );
}

main();

