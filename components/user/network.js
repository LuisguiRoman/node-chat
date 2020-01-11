const express = require('express');
const response = require('../../network/response');
const controller = require('./controller');
const router = express.Router();

router.get('/', (req, res)=>{
    controller.getUsers()
        .then((usersList)=>{
            response.success(req, res, usersList, 200);
        })
        .catch(e =>{
            response.error(req, res, e, 400);
        });
});

router.post('/', (req, res)=>{
    controller.addUser(req.body.name)
        .then((user)=>{
            response.success(req, res, user, 201);
        })
        .catch(e =>{
            response.error(req, res, 'Informacion invalida', 400, e);
        })
});

module.exports = router;