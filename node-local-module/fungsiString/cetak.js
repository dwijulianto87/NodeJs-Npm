function cetakNama( angka1, nama, angka2, result){
    console.log(`${angka1} ${nama} ${angka2} adalah ${result}`)
}

class newData{
    constructor(nama, umur){
        this.nama = nama, this.umur = umur
    }
}

module.exports = { cetakNama, newData} ;