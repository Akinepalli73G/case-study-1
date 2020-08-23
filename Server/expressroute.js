'use strict';
const cors = require('cors');
const uuid = require('uuid');
var jwt = require('jsonwebtoken');
const fs = require('fs');
const port = 8080
const express = require('express'),
    router = express.Router();
    const authenticateJWT = (req, res, next) => {
        const authHeader = req.headers.authorization;
        if (authHeader) {
            const token = authHeader.split(' ')[1];
            jwt.verify(token, "insurence", (err, user) => {
                if (err) {
                    return res.sendStatus(403);
                }
                req.user = user;
                next();
            });
        } else {
            res.sendStatus(401);
        }
    };
router.post('/loginInfo', require('./login'));
router.get('/', (req, res) => res.send('Hello World!'))
router.post('/users', authenticateJWT, (req, res) => {
    fs.readFile('data.json', (err, data) => {
        var postObj = req.body;
        postObj.id = uuid.v4();
        var fileObject = {};
        var dataArray = [];
        if (err) {
            fileObject = {
                data: [postObj]
            };
        } else {
            if (data.length > 0) {
                dataArray = JSON.parse(data.toString('utf8')).data;
            }
            dataArray.push(postObj);
            fileObject = {
                data: dataArray
            }
        }
        fs.writeFile('data.json', JSON.stringify(fileObject), err => {
            if (err) {
                res.status(500).send({
                    "msg": "Failed"
                })
            } else {
                res.status(200).send({
                    "msg": "success",
                    "data": postObj.id
                });
            }
        })
    })



});
router.put('/users/:id', authenticateJWT, (req, res) => {
    fs.readFile('data.json', (err, data) => {
        var putObj = req.body;
        var fileObject = {};
        if (err) {
            fileObject = {
                data: [postObj]
            };
        } else {
            var dataArray = JSON.parse(data.toString('utf8')).data;
            var index;
            index = dataArray.findIndex(function (item, index, array) {
                return item.id == req.params.id;
            });
            dataArray[index] = putObj;

            //res.status(200).send({"msg":"Success",data:result});
            fileObject = {
                data: dataArray
            }
        }
        fs.writeFile('data.json', JSON.stringify(fileObject), err => {
            if (err) {
                res.status(500).send({
                    "msg": "Failed"
                })
            } else {
                res.status(200).send({
                    "msg": "success",
                    "data": "Record updated successfully"
                });
            }
        })
    })



});
router.get('/users', authenticateJWT, (req, res) => {
    fs.readFile('data.json', (err, data) => {
        if (err) {
            res.status(500).send({
                "msg": "Error retreiving data"
            });
        } else {
            res.status(200).send({
                "msg": "Success",
                data: JSON.parse(data.toString('utf8')).data
            });
        }
    })
});
router.get('/users/:id', authenticateJWT, (req, res) => {
    fs.readFile('data.json', (err, data) => {
        if (err) {
            res.status(500).send({
                "msg": "Error retreiving data"
            });
        } else {
            var dataArray = JSON.parse(data.toString('utf8')).data;
            var result = {};
            result = dataArray.find(function (item, index, array) {
                return item.id == req.params.id;
            })
            res.status(200).send({
                "msg": "Success",
                data: result
            });
        }
    })
});

router.get('/deleteUser/:id', (req, res) => {
    fs.readFile('data.json', (err, data) => {
        if (err) {
            res.status(500).send({
                "msg": "Error retreiving data"
            });
        } else {
            var dataArray = JSON.parse(data.toString('utf8')).data;
            var result = {};
            result = dataArray.filter(function (item, index, array) {
                return item.id != req.params.id;
            })

            fs.writeFile('data.json', JSON.stringify({
                data: result
            }), err => {
                if (err) {
                    res.status(500).send({
                        "msg": "Failed"
                    })
                } else {
                    res.status(200).send({
                        "msg": "success"
                    });
                }
            })
        }
    })
});

module.exports = router;