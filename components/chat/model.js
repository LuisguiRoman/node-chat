const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Relacionar la coleccion usuarios con la  de mensajes
const mySchema = new Schema({
    users: [{
        type: Schema.ObjectId,
        ref: 'User',
    }]
});

const model = mongoose.model('chat', mySchema);

module.exports = model;