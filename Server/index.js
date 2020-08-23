const express = require('express');
const app = express();
const cors = require('cors');
const uuid = require('uuid');
  expressRoutes = require('./expressRoute');
//var jwt = require('jsonwebtoken');
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
const fs = require('fs');
const port = 8080
app.use('/', expressRoutes);
// router.post('/loginInfo', require('./login'));
// app.get('/', (req, res) => res.send('Hello World!'))
// app.post('/users',(req,res)=>{
//     fs.readFile('data.json',(err,data)=>{
//         var postObj = req.body;
//         postObj.id = uuid.v4();
//         var fileObject ={};
//         var dataArray = [];
//         if(err)
//         {
//            fileObject ={data:[postObj]};
//         }
//         else
//         {
//             if(data.length>0)
//             {
//                  dataArray = JSON.parse(data.toString('utf8')).data;
//             }
//             dataArray.push(postObj);
//             fileObject = {data:dataArray}
//         }
//         fs.writeFile('data.json',JSON.stringify(fileObject),err=>{
//             if(err)
//             {
//                 res.status(500).send({"msg":"Failed"})
//             }
//             else
//             {
//                 res.status(200).send({"msg":"success","data":postObj.id});
//             }
//         })
//     })
    
   

// });
// app.put('/users/:id',(req,res)=>{
//     fs.readFile('data.json',(err,data)=>{
//         var putObj = req.body;
//         var fileObject ={};
//         if(err)
//         {
//            fileObject ={data:[postObj]};
//         }
//         else
//         {
//             var dataArray = JSON.parse(data.toString('utf8')).data;
//             var index;
//             index=  dataArray.findIndex(function(item,index,array){
//                 return item.id==req.params.id;
//             });
//             dataArray[index] = putObj;

//             //res.status(200).send({"msg":"Success",data:result});
//             fileObject = {data:dataArray}
//         }
//         fs.writeFile('data.json',JSON.stringify(fileObject),err=>{
//             if(err)
//             {
//                 res.status(500).send({"msg":"Failed"})
//             }
//             else
//             {
//                 res.status(200).send({"msg":"success","data":"Record updated successfully"});
//             }
//         })
//     })
    
   

// });
// app.get('/users',(req,res)=>{
//     fs.readFile('data.json',(err,data)=>{
//         if(err)
//         {
//             res.status(500).send({"msg":"Error retreiving data"});
//         }
//         else
//         {
//             res.status(200).send({"msg":"Success",data:JSON.parse(data.toString('utf8')).data});
//         }
//     })
// });

// app.post('/loginInfo',function (req, res) {
// var userName = req.body.username
// var password = req.body.password;
// var token;
// let resdata = {};
// usersdata.data.forEach(element => {
//     if (element.username == req.body.username && element.password == req.body.password) {
//         token = GenarateToken(req.body.username, element.role);
//         resdata.userName = element.userId,
//             resdata.role = element.role;
//         resdata.level = element.level;
//         resdata.token = token;
//         resdata.msg = "Success"
//     }
// });
// console.log(resdata);
// if (resdata.userName) {
//     console.log(hello);
//     res.status(200);
//     res.send(resdata);
// } else {
//     res.status(200).send({
//         "msg": "Invalid User"
//     });
// }

// });

// app.get('/users/:id',(req,res)=>{
//     fs.readFile('data.json',(err,data)=>{
//         if(err)
//         {
//             res.status(500).send({"msg":"Error retreiving data"});
//         }
//         else
//         {
//             var dataArray = JSON.parse(data.toString('utf8')).data;
//             var result= {};
//             result=  dataArray.find(function(item,index,array){
//                 return item.id==req.params.id;
//             })
//             res.status(200).send({"msg":"Success",data:result});
//         }
//     })
// });

// app.get('/deleteUser/:id',(req,res)=>{
//     fs.readFile('data.json',(err,data)=>{
//         if(err)
//         {
//             res.status(500).send({"msg":"Error retreiving data"});
//         }
//         else
//         {
//             var dataArray = JSON.parse(data.toString('utf8')).data;
//             var result= {};
//             result=  dataArray.filter(function(item,index,array){
//                 return item.id!=req.params.id;
//             })
            
//             fs.writeFile('data.json',JSON.stringify({data: result}),err=>{
//                 if(err)
//                 {
//                     res.status(500).send({"msg":"Failed"})
//                 }
//                 else
//                 {
//                     res.status(200).send({"msg":"success"});
//                 }
//             })
//         }
//     })
// });

app.listen(port, () => console.log(`Example app listening on port ${port}!`))