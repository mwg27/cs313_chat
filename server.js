const express = require('express')
const app = express()
const port = 8080
const path = require('path');
const router = express.Router();
var bodyParser = require('body-parser');
app.use( bodyParser.json() );  
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
});
app.get('/app.js',function(req,res){
  res.sendFile(path.join(__dirname+'/app.js'));
});
app.get('/chat.controller.js',function(req,res){
  res.sendFile(path.join(__dirname+'/chat.controller.js'));
});
app.get('/chat.html',function(req,res){
  res.sendFile(path.join(__dirname+'/chat.html'));
});
app.get('/create.controller.js',function(req,res){
  res.sendFile(path.join(__dirname+'/create.controller.js'));
});
app.get('/create.html',function(req,res){
  res.sendFile(path.join(__dirname+'/create.html'));
});
app.get('/home.controller.js',function(req,res){
  res.sendFile(path.join(__dirname+'/home.controller.js'));
});
app.get('/home.html',function(req,res){
  res.sendFile(path.join(__dirname+'/home.html'));
});
app.get('/css/myCSSfile4.css',function(req,res){
  res.sendFile(path.join(__dirname+'/css/myCSSfile4.css'));
});

app.post('/createLogin',function(req,res){
    var userName = req.body.username;
    var password = req.body.password;
    createNewUser(userName,password);
    res.status(200).end();
});

function createNewUser( userName, password){
  console.log(userName);
  console.log(password);
}
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
