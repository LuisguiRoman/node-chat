const Model = require('./model');

const addMessage = message =>{
    const myMessage = new Model(message);
    myMessage.save();
}

const getMessage = async (filterUser) =>{
    return new Promise((resolve, reject)=>{
        let filter = {};
        //user filtros "Querys en mongo"
        if(filterUser !== null){
            filter = {user: filterUser};
        }
        const messages = Model.find(filter)
                            .populate('user')
                            .exec((err, populated)=>{
                                if(err){
                                    reject(err);
                                    return false;
                                }else{
                                    resolve(populated);
                                }
                            });
    });
}

const updateMessage = async (id, message) =>{
    //buscar en la db el mensaje por el id
    const findMessage = await Model.findOne({
        _id: id
    });

    findMessage.message = message;
    const newMessage = await findMessage.save();
    return newMessage;
}

const deleteMessage = (id) =>{
    return Model.deleteOne({
        _id: id
    });
}

module.exports = {
    add: addMessage,
    list: getMessage,
    update: updateMessage,
    delete: deleteMessage
}