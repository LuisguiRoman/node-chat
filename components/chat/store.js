const Model = require('./model');

const addChat = chat =>{
    const myChat = new Model(chat);
    return myChat.save();
}

const getChats = (userId) =>{
    return new Promise((resolve, reject)=>{
        let filter = {};
        //user filtros "Querys en mongo"
        if(userId !== null){
            filter = {users: userId};
        }
        Model.find(filter)
            .populate('users')
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

module.exports = {
    add: addChat,
    list: getChats,
}