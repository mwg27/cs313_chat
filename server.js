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

app.get('/img/loginbtn.png',function(req,res){
  res.sendFile(path.join(__dirname+'/img/loginbtn.png'));
});
app.get('/img/cancelbtn.png',function(req,res){
  res.sendFile(path.join(__dirname+'/img/cancelbtn.png'));
});
app.get('/img/createbtn.png',function(req,res){
  res.sendFile(path.join(__dirname+'/img/createbtn.png'));
});
app.get('/img/users.jpg',function(req,res){
  res.sendFile(path.join(__dirname+'/img/users.jpg'));
});
app.get('/img/LoginRed.jpg',function(req,res){
  res.sendFile(path.join(__dirname+'/img/LoginRed.jpg'));
});


app.post('/createLogin',function(req,res){
  console.log(req.body);
    var userName = req.body.username;
    var password = req.body.password;
    createNewUser(userName,password).then(function(results){
      res.status(200).send("ok");
    }).catch(function(err){
      res.status(200).send("bad");
    });
});

app.post('/login',function(req,res){
  console.log(req.body);
    var userName = req.body.username;
    var password = req.body.password;
    validateLogin(userName,password).then(function(results){
      console.log(results);
      res.status(200).send(''+results);
    }).catch(function(err){
      res.status(200).send("-1");
    });
});

function validateLogin(userName, password){
  return new Promise(function(resolve, reject){
    console.log(userName);
    console.log(password);
    var mysql = require('mysql');
    var con = mysql.createConnection({
      host: "localhost",
      user: "mike",
      password: "!1Goulding0)",
      database: "mike"
    });
    var cntsql = "SELECT * FROM users WHERE login_ID='" + userName + "'";
    con.query(cntsql, function (err, result, fields) {
      if (err) {
        reject(new Error("Error"));
      } else {
        console.log(result[0]);
        if( typeof result[0] === 'undefined')
          reject(new Error("Invalid"));
        if( result[0].password ===  password) {
          resolve(result[0].userID);
        } else {
          reject(new Error("Invalid"));
        }
      }
    });
  });
}

function createNewUser( userName, password){
      return new Promise(function(resolve, reject){
        console.log(userName);
        console.log(password);
        var mysql = require('mysql');
        var con = mysql.createConnection({
          host: "localhost",
          user: "mike",
          password: "!1Goulding0)",
          database: "mike"
        });
        var cntsql = "SELECT count(*) as count FROM users WHERE login_ID='" + userName + "'";
        con.query(cntsql, function (err, result, fields) {
          if (err) {
            reject(new Error("Error"));
          } else {
            if( result[0].count > 0) {
              reject(new Error("Used"));;
            } else {
              var inssql = "INSERT INTO users (userID, login_ID, password) VALUES (0,'" + userName + "','" + password + "')";
              con.query(inssql, function (err, result) {
                if (err) throw err;
                console.log("1 record inserted into users " +  result);
              });
              resolve("ok");
            }
          }
        });
      });
    }


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
