const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Relacionar la coleccion usuarios con la  de mensajes
const mySchema = new Schema({
    chat: {
        type: Schema.ObjectId,
        ref: 'Chat'
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    message: {
        type: String,
        required: true
    },
    date: Date,
    file: String
});

const model = mongoose.model('Message', mySchema);

module.exports = model;