const matematika = require('./fungsimtk/fungsiMtk')
const cetak = require('./fungsiString/cetak')
const angka1 = 6;
const angka2 = 3;

const kali = matematika.kali(angka1, angka2)
const bagi = matematika.bagi(angka1, angka2)
const tambah = matematika.tambah(angka1, angka2)
const kurang = matematika.kurang(angka1, angka2)

cetak.cetakNama(angka1, 'kali', angka2, kali)
cetak.cetakNama(angka1, 'bagi', angka2, bagi)
cetak.cetakNama(angka1, 'tambah', angka2, tambah)
cetak.cetakNama(angka1, 'kurang', angka2, kurang)

const data = new cetak.newData('dwi', 30)
console.log(data)