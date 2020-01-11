const express = require('express');
const multer = require('multer');
const response = require('../../network/response');
const controller = require('./controller');
const router = express.Router();

const upload = multer({
    dest: 'public/uploads/'
});

router.get('/', (req, res)=>{
    const filterMessages = req.query.chat || null;
    controller.getMessages(filterMessages)
        .then((messageList)=>{
            response.success(req, res, messageList, 200);
        })
        .catch(e =>{
            response.error(req, res, e, 400);
        });
});

router.post('/', upload.single('file'), (req, res)=>{
    controller.addMessage(req.body, req.file)
        .then((fullMessage)=>{
            response.success(req, res, fullMessage, 201);
        })
        .catch(()=>{
            response.error(req, res, 'Informacion invalida', 400, 'error en el controlador');
        })
});

router.patch('/:id', (req, res)=>{
    controller.updateMessage(req.params.id, req.body.message)
        .then(data =>{
            response.success(req, res, data, 200);
        })
        .catch(e =>{
            response.error(req, res, 'error interno', 500, e);
        });
});

router.delete('/:id', (req, res)=>{
    controller.deleteMessage(req.params.id)
        .then(data =>{
            response.success(req, res, data, 200);
        })
        .catch(e =>{
            response.error(req, res, 'error interno', 500, e);
        });
});

module.exports = router;