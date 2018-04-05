var express = require("express");
var bodyParser = require('body-parser');
var ejs=require('ejs');
var db=require('./db.js');
var app=express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('./'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
http.listen(process.env.PORT||8080);
app.get('/',function(req,res){
   res.sendFile(__dirname+'./index.html');
});
app.post('/data',function(req,res){
    var id=parseInt(req.body.id),
        name=req.body.name;
        department=req.body.department;
        DOB=req.body.DOB;
    db.dbInsert(id,name,department,DOB);
    res.redirect('/view');
});
app.get('/view',function(req,res){
    var data=function(err,result){
        if(err) throw err;
        res.render('view',{result:result});
    }
    db.getData(data);
})
app.post('/deletebyId',function(req,res){
    var id=parseInt(req.body.id);
    var data=function(err,result){
        if(err) throw err;
        console.log(result);
        res.redirect('/view');
    }
    db.deletebyId(id,data);
})
app.post('/editbyId',function(req,res){
    var id=parseInt(req.body.id);
        res.render('edit',{id:id});
})
app.post('/edit',function(req,res){
    id=req.body.id.replace(/\//g,"");
    name=req.body.name;
    department=req.body.department;
    DOB=req.body.DOB;
    var data=function(err,result){
        if(err) throw err;
        console.log(result);
        res.redirect('/view');
    }
    db.editbyId(id,name,department,DOB,data);
})
io.on('connection',function(socket){
     var call=function(err,result)
        {
            if(result.isEmpty())
            {
                socket.emit('success',{});
            }
            else
            {
                socket.emit('failure',{});
            }
        }
    socket.on('check',function(id){
        console.log(id);
        db.check(id,call);
    })
   
    socket.on('disconnect',function(){

    });
})