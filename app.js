var express = require("express") ;
var formidable = require("formidable");
var mongoose = require("mongoose");
var User = require("./models/User.js");
// var session = require('express-session');
var url = require("url");
var path = require("path");
// var cookieParser = require('cookie-parser');
var app = express();

mongoose.connect("mongodb://localhost/project_3302");
// app.set('trust proxy', 1) ;// trust first proxy 
// app.use(cookieParser('project_3302'));
// app.use(session({
//   secret: 'project_3302',
//   resave: false,
//   saveUninitialized: true
// }));

app.get("/",function(req,res){
	res.send("<h1>hello</h1>")
});
app.get("/users",function(req,res){
	
	var {page,pageSize,sortBy,order,filters} = url.parse(req.url,true).query;
	filters=JSON.parse(filters);
	console.log(filters);
	var pageAmount,total;
	User.find({}).exec(function(err,users){
		if(filters.length != 0){
			filters.forEach((item)=>{
				switch(item.name){
					case "id":
					case "name":
					case "telephone":
						users=users.filter((_item)=>{
							return _item[item.name] == item.value;
						})
						break;
					case "keyWord":
						users = users.filter((_item)=>{
							for (let k in _item){
								if(String(_item[k]).includes(String(item.value))){
									return true;
								}
							}
							return false;
						})
						break;
				}
			})
		}
		total=users.length;
		pageAmount=Math.ceil(total/pageSize);
		// if(keyWord){
		// 	users = users.filter(function(item){
		// 		for(var k in item){
		// 			if(String(item[k]).includes(keyWord)){
		// 				return true;
		// 			}
		// 		}
		// 		return false;
		// 	});
		// }
		if(sortBy == undefined) sortBy="id";
		users = users.sort(function(a,b){
			if(a[sortBy]>b[sortBy]){
				return 1;
			}else if(a[sortBy]<b[sortBy]){
				return -1;
			}else if(a[sortBy]==b[sortBy]){
				return 0;
			}
		}) ;
		if(order == undefined) sortBy="ascend";
		if(order != "ascend"){
			users.reverse();
		}
		users=users.slice((page-1)*pageSize,page*pageSize);
		res.json({
			page,
			pageSize,
			pageAmount,
			total,
			sortBy,
			order,
			filters,
			users
		})
	})
});

app.post("/login",function(req,res){
	var form = new formidable.IncomingForm();
	form.parse(req,function(err,fields,files){
		var obj = {
			"id":fields.id,
			"password" : fields.password
		}
		User.find(obj).exec(function(err,users){
			if(!err){
				if(users.length != 0){
					
					res.json({result:1})
				}else{
					res.json({result:-1})
				}
				
			}else{

				res.json({result:0})
			}
		})
		
		
	})
});
app.post("/regist",function(req,res){
	var form = new formidable.IncomingForm();
	form.parse(req,function(err,fields,files){
		var id;
		User.find({}).exec(function(err,users){
			if(users.length !=0){
				id=users.reduce(function(pre,nev){
					return pre.id>nev.id?pre:nev;
				}).id+1
			}else{
				id=10001;
			}
			var obj = {
				"id": id,
				"name": fields.name,
				"password": fields.password,
				"telephone": "+" + fields.prefix + fields.telephone,
				"homeplace": fields.homeplace.join(""),
				"email": fields.email
			}
			User.create(obj,function(err){
				if(err){
					res.json({result:0});
				}else{
					res.json({result:1});
				}
			})
			
		})
		
	});
});

app.post("/users/:id",function(req,res){
	var id=parseInt(req.params.id);
	var form = new formidable.IncomingForm();
	form.parse(req,function(err,fields,files){

		User.update({"id":id},{"$set":{
			
			"name": fields.name,
			"email": fields.email,
			"homeplace": fields.homeplace,
			"telephone": fields.telephone
			
		}},function(err){
			console.log(fields)
			res.json({result:1})
		})
	})
});

app.listen(3000,function(){
	console.log("run at 3000")
});