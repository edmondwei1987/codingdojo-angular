var express=require('express');
var app=express();
//serve json
var bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());
// Mongo DB
var mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/codingdojo');
var personSchema=mongoose.Schema({name:String});
mongoose.model('Person',personSchema);
var Person=mongoose.model('Person');

app.get('/persons',function(req,res){
  Person.find({},function(err,persons){
    if(err){
      res.json({message: "Error", error: err});
    }else{
      res.json({message:'Success',data:persons});
    }
  });
});
app.get('/person/',function(req,res){
  console.log('you in');

  Person.find({},function(err,person){
    if(err){
      return res.json({message: "Error", error: err});
    }else{
      return res.json({message:"Success",person:person});
    }
  });
});
app.get('/person/:name',function(req,res){
  Person.find({name:req.params.name},function(err,person){
    if(err){
      return res.json({message: "Error", error: err});
    }else{
      return res.json({message:"Success",person:person});
    }
  });
});
app.post('/person/create',function(req,res){
  Person.create(req.body,function(err,person){
    if(err){
      return res.json({message:"Error"});
    }else{
      return res.json({message:"Success"});
    }
  })
});
app.get('/person/delete/:id',function(req,res){
  Person.remove({_id:req.params.id},function(err){
    if(err){
      return res.json({message:"Error"});
    }else{
      return res.json({message:"Success"});
    }
  })
});
app.get('/person/find/:id',function(req,res){
  Person.find({_id:req.params.id},function(err,data){
    return res.json({person:data});
  })
});
app.post('/person/update',function(req,res){
  Person.update({_id:req.body._id},{$set:{name:req.body.name}},function(err,message){
    if(err){
      return res.json({message:"Error"});
    }else{
      return res.json({message:"Success"});
    }
  })
});


app.use(express.static(__dirname+'/angularApp/dist'));
app.listen(8000,function(){
  console.log('listen on port 8000')
});
