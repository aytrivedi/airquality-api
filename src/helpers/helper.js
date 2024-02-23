const {default : axios} = require('axios');

function airqualityCallback(url , callback){
    axios.get(url).then((resp)=>{
        callback(null , resp.data);
    }).catch((err)=>{
        callback(err,null);
    });
}

function airqualityPromise(url, callback){
      return new Promise((resolve,reject) =>{
        axios.get(url).then((resp)=>{
            resolve(resp.data);
        }).catch((err)=>{
            reject(err);
        });
      });
}

module.exports = {
    airqualityCallback,
    airqualityPromise
}

