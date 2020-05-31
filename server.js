//jshint esversion: 8
const express = require('express');
const bodyParser = require ("body-parser");
var nameListObjects = [];
var nameList = [];
var app = express();
class User {
 name;
 status;

  constructor(name) {
    this.name = name;
  }
  getName() {
    return this.name;
  }

  getStatus() {
    return this.status;
  }

  setStatus(status) {
    this.status = status;
  }


}

app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.get("/currency",function(req,res){
	res.send("Anna is the Queen of Gil (;)");
});


app.post("/wake",function(req,res){
	let nameWake = req.body.name;
	if(nameList.includes(nameWake)){
		for (i = 0; i < nameListObjects.length; i++) {
			if(nameListObjects[i].getName() === nameWake){
				nameListObjects[i].setStatus("yes");
				res.send("woken");
			}
		}
	}else{res.send("user doesnt exist");}
});


app.post("/checkwake",function(req,res){
	let nameCheck = req.body.name;
	let tmpUser;
	if(nameList.includes(nameCheck)){
		for (i = 0; i < nameListObjects.length; i++) {
			if(nameCheck === nameListObjects[i].getName()){
				res.send(nameListObjects[i].getStatus());
				if(nameListObjects[i].getStatus() === "yes"){
					nameListObjects[i].setStatus("no");
				}
			}
		}
	}else{
		tmpUser = new User(nameCheck);
		tmpUser.setStatus("no");
		nameListObjects.push(tmpUser);
		nameList.push(nameCheck);
		res.send("new user");
	}
});


app.listen(process.env.PORT || 3000,function(){

  console.log("anna and gil");

});
