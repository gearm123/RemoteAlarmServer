//jshint esversion: 8
const express = require('express');
const bodyParser = require ("body-parser");
var nameListObjects = [];
var nameList = [];
var app = express();
class User {
 number;
 status;
 wakerNum;
  constructor(number) {
    this.number = number;
    this.wakerNum = "none";
    this.status = "no";
  }
  getNumber() {
    return this.number;
  }

  getStatus() {
    return this.status;
  }

  getWaker() {
    return this.wakerNum;
  }

  setStatus(status) {
    this.status = status;
  }
  setWaker(waker) {
    this.wakerNum = waker;
  }


}

app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.get("/currency",function(req,res){
	res.send("Anna is the Queen of Gil (;)");
});


app.post("/wake",function(req,res){
	let number_toWake = req.body.number_toWake;
	let number_waker = req.body.number_waker;
	if(nameList.includes(number_toWake)){
		for (i = 0; i < nameListObjects.length; i++) {
			if(nameListObjects[i].getNumber() === number_toWake){
				nameListObjects[i].setStatus("yes");
				nameListObjects[i].setWaker(number_waker);
				res.send("woken");
			}
		}
	}else{res.send("user doesnt exist");}
});


app.post("/checkwake",function(req,res){
	let numberCheck = req.body.number;
	let tmpUser;
	if(nameList.includes(numberCheck)){
		for (i = 0; i < nameListObjects.length; i++) {
			if(numberCheck === nameListObjects[i].getNumber()){
				res.send({status:nameListObjects[i].getStatus(), waker: nameListObjects[i].getWaker()});
				if(nameListObjects[i].getStatus() === "yes"){
					nameListObjects[i].setStatus("no");
					nameListObjects[i].setWaker("none");
				}
			}
		}
	}else{
		tmpUser = new User(numberCheck);
		tmpUser.setStatus("no");
		nameListObjects.push(tmpUser);
		nameList.push(numberCheck);
		res.send({status:"new user", waker: "none"});
	}
});


app.listen(process.env.PORT || 3000,function(){

  console.log("anna and gil");

});
