"use strict";
var jwt = require('jsonwebtoken');
const usersdata = require('./login.json');
const validateUser = function (req, res) {
    var userName = req.body.username
    var password = req.body.password;
    var token;
    let resdata = {};
    usersdata.data.forEach(element => {
        if (element.username == req.body.username && element.password == req.body.password) {
            token = GenarateToken(req.body.username, element.role);
            resdata.userName = element.username,
                resdata.role = element.role;
                resdata.lvl = element.level;
            resdata.token = token;
            resdata.msg = "Success"
        }
    });
    if (resdata.userName) {
        res.status(200);
        res.send(resdata);
    } else {
          res.status(200).send({
              "msg": "Invalid User"
          });
    }

}
const GenarateToken = function (key, memberId) {
    let genaratedToken = jwt.sign({
        token: key
    }, "insurence");

    return genaratedToken;

}

module.exports = validateUser;