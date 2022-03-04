const { ObjectID } = require('bson');
const { error } = require('console');
const { MongoClient } = require('mongodb');

// Database Name
const dbName = 'gesozDb';

// Connection URI
const uri = 'mongodb://127.0.0.1:27017';

const client = new MongoClient(uri);
// const client = new MongoClient(uri, {
//     useNewUrlParser:true,
//     useUnifiedTopology:true,
// });


client.connect((err, client) => {
    if(err){
        return console.log(err);
    }
    // console.log('koneksi ok');

    // pilih database
    const db = client.db(dbName);


    // // menambahkan 1 data ke collection mahasiswa
    // db.collection('mahasiswa').insertOne(
    //     {
    //         nama: 'Putra pratama',
    //         email: 'putra@gmail.com'
    //     },
    //     (error, result) => {
    //         if(error){
    //             return console.log('data gagal ditambahkan');
    //         }
    //         console.log(result);
    //     }
    // );


    // // menambahkan lebih dari 1 data ke collection mahasiswa
    // db.collection('mahasiswa').insertMany(
    //     [
    //         {
    //             nama: 'wawan',
    //             email: 'wawan@gmail.com',
    //             nohp:'089999999'
    //         },
    //         {
    //             nama: 'wawan',
    //             email: 'wawan@yahoo.com',
    //             nohp:'08977777777'
    //         },
    //     ],
    //     (error, result) => {
    //         if(error){
    //             return console.log('data gagal ditambahkan');
    //         }
    //         console.log(result);
    //     }
    // );



    // //  menampilkan semua data di collection mahasiswa
    // db
    // .collection('mahasiswa')
    // .find()
    // .toArray((error, result) =>{
    //     console.log(result)
    // });



        // //  menampilkan data berdasarkan kritria nama yang ada di collection mahasiswa
        // db
        // .collection('mahasiswa')
        // .find( {nama: "Erik"} )
        // .toArray((error, result) =>{
        //     console.log(result)
        // });


        // //  menampilkan data berdasarkan kritria id yang ada di collection mahasiswa
        // db
        // .collection('mahasiswa')
        // .find({_id:ObjectID("61b81ac3a3bd36b28fac1c3f")})
        // .toArray((error, result) =>{
        //     console.log(result)
        // });
        

        // //  mengubah data berdasarkan kritria id yang ada di collection mahasiswa
        // const updatePromise = db.collection('mahasiswa').updateOne(
        //     {
        //         _id:ObjectID("61b81ac3a3bd36b28fac1c3f") // target
        //     },
        //     {
        //         $set: { nama: 'Erlangga alfaro', }, // di ubah
        // });
        // updatePromise
        // .then((result) => { console.log(result) })
        // .catch((error) => { console.log(error) });




        // //  mengubah data berdasarkan kritria lebih dari 1 yang ada di collection mahasiswa
        // db.collection('mahasiswa').updateMany(
        //     {
        //         nama:"wawan" // target
        //     },
        //     {
        //         $set: { email: 'wawan@yahoo.co.id', nohp:'0866666666'}, // di ubah
        // })
        // .then((result) => { console.log(result) })
        // .catch((error) => { console.log(error) });


        // //  menghapus data berdasarkan kritria  yang ada di collection mahasiswa
        // db.collection('mahasiswa').deleteOne(
        //     {
        //         _id:ObjectID("61b81ac3a3bd36b28fac1c3f") // target
        //     }
        // )
        // .then((result) => { console.log(result) })
        // .catch((error) => { console.log(error) });


        //  menghapus data berdasarkan kritria lebih dari 1 yang ada di collection mahasiswa
        db.collection('mahasiswa').deleteMany(
            {
                nama:"wawan" // target
            }
        )
        .then((result) => { console.log(result) })
        .catch((error) => { console.log(error) });
    });
