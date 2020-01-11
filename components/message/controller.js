const store = require('./store');
const config = require('../../config');
const socket = require('../../socket').socket;

const addMessage = ({user, message, chat}, file)=>{
    return new Promise((resolve, reject)=>{
        if(!user || !message || !chat){
            console.error('[messagecontroller] No hay usuario o mensaje');
            reject('Datos incorrectos');
            return false;
        }

        let fileUrl = '';
        if(file){
            fileUrl = config.host + ':' + config.port + config.publicRoute + '/uploads/' + file.filename;
        }

        const fullMessage = {
            user, message, chat,
            date: new Date(),
            file: fileUrl
        }

        store.add(fullMessage);

        socket.io.emit('message', fullMessage);

        resolve(fullMessage);
    });
}

const getMessages = (filterUser) =>{
    return new Promise((resolve, reject)=>{
        resolve( store.list(filterUser) );
    });
}

const updateMessage = (id, message) =>{
    return new Promise( async (resolve, reject)=>{
        if(!id || !message){
            reject('invalid data');
            return false;
        }
        const result = await store.update(id, message);
        resolve(result);
    });
}

const deleteMessage = (id) =>{
    return new Promise((resolve, reject)=>{
        if(!id){
            reject('invalid data');
            return false;
        }
        store.delete(id)
            .then(()=>{
                resolve();
            }).catch(()=>{
                reject();
            });
    });
}

module.exports = {
    addMessage,
    getMessages,
    updateMessage,
    deleteMessage
};