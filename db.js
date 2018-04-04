var promise = require('bluebird');
var options = {
  // Initialization Options
  promiseLib: promise
};
var pgp = require('pg-promise')(options);
var connectionString='postgres://ksubinrgfjhojy:0ac6cb36a2d63e697a7d7a12a42bbfa24a4ef561969fbb2ff7c86a71adb14f56@ec2-23-21-166-148.compute-1.amazonaws.com:5432/d8cfi3emqkjkvh';
var db = pgp(connectionString);
var data;
var id,
    name,
    department,
    DOB;
function table(){
    var table="CREATE TABLE IF NOT EXISTS employee(
                ID INT PRIMARY KEY      NOT NULL,
                NAME           CHAR(50) NOT NULL,
                DEPARTMENT     CHAR(50)      NOT NULL,
                 DOB DATE NOT NULL
               );";
        db.none(table)
        .then(function () {
        if (err) throw err;
        console.log('inserted');
    })
}
function dbInsert(id, name, department, DOB) {
    table();
    console.log('connected');
    var sql = "insert into employee (id,name,department,DOB) values ($1,$2,$3,$4)";
    db.none(sql, [id, name, department, DOB])
    .then(function () {
        if (err) throw err;
        console.log('inserted');
    })
}
function getData(callback) {
    console.log('connected');
    var sql = "select * from employee";
    db.any(sql)
    .then (function (result) {
        if (err) throw err;
        console.log('data extracted');
        callback(null, result);
    })
}
function deletebyId(id, callback) {
    var sql = "delete from employee where id=$1"
    db.none(sql, [id])
    .then(function (result) {
        if (err) throw err;
        console.log('deleted by id');
        callback(null, result);
    })
}
function editbyId(id, name, department, DOB, callback) {
    var sql = "update employee set name=$1,department=$2,DOB=$3 where id=$4";
    db.any(sql, [name, department, DOB, id])
    .then(function (result) {
        if (err) throw err;
        console.log('updated');
        callback(null, result);
    })
}
module.exports = { dbInsert, getData, deletebyId, editbyId };