const express = require('express');
const response = require('../../network/response');
const controller = require('./controller');
const router = express.Router();

router.get('/:userId', (req, res)=>{
    controller.getChats(req.params.userId)
        .then(users =>{
            response.success(req, res, users, 200);
        })
        .catch(err =>{
            response.error(req, res, err, 400, err);
        });
});

router.post('/', (req, res)=>{
    controller.addChat(req.body.users)
        .then(data => {
            response.success(req, res, data, 201);
        })
        .catch(err =>{
            response.error(req, res, 'Informacion invalida', 500, err);
        });
});


module.exports = router;