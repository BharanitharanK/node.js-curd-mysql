var db=require('mysql');
var data;
var id,
    name,
    department,
    DOB;
var con=db.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"mydb"
});
function dbInsert (id,name,department,DOB){
    console.log('connected');
    var sql="insert into employee (id,name,department,DOB) values (?,?,?,?)";
    con.query(sql,[id,name,department,DOB],function(err,result){
        if(err) throw err;
        console.log('inserted');
    })
}
function getData (callback){
    console.log('connected');
    var sql="select * from employee";
    con.query(sql,function(err,result){
        if(err) throw err;
        console.log('data extracted');
        callback(null,result);
    })
}
function deletebyId(id,callback){
    var sql="delete from employee where id=?"
    con.query(sql,[id],function(err,result){
     if(err) throw err;
        console.log('deleted by id');
        callback(null,result);
    })
}
function editbyId(id,name,department,DOB,callback){
     var sql="update employee set name=?,department=?,DOB=? where id=?";
    con.query(sql,[name,department,DOB,id],function(err,result){
     if(err) throw err;
        console.log('updated');
        callback(null,result);
    })
}
module.exports={dbInsert,getData,deletebyId,editbyId};