var db = require('pg');
var data;
var id,
    name,
    department,
    DOB;
var connectionString="postgres://ksubinrgfjhojy:0ac6cb36a2d63e697a7d7a12a42bbfa24a4ef561969fbb2ff7c86a71adb14f56@ec2-23-21-166-148.compute-1.amazonaws.com:5432/d8cfi3emqkjkvh";
var con = db.createConnection({
 connectionString: connectionString
});
function dbInsert(id, name, department, DOB) {
    console.log('connected');
    var sql = "insert into employee (id,name,department,DOB) values (?,?,?,?)";
    con.query(sql, [id, name, department, DOB], function (err, result) {
        if (err) throw err;
        console.log('inserted');
    })
}
function getData(callback) {
    console.log('connected');
    var sql = "select * from employee";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log('data extracted');
        callback(null, result);
    })
}
function deletebyId(id, callback) {
    var sql = "delete from employee where id=?"
    con.query(sql, [id], function (err, result) {
        if (err) throw err;
        console.log('deleted by id');
        callback(null, result);
    })
}
function editbyId(id, name, department, DOB, callback) {
    var sql = "update employee set name=?,department=?,DOB=? where id=?";
    con.query(sql, [name, department, DOB, id], function (err, result) {
        if (err) throw err;
        console.log('updated');
        callback(null, result);
    })
}
module.exports = { dbInsert, getData, deletebyId, editbyId };