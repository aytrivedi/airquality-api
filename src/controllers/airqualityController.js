const airquality = require('express').Router();
const {airqualityCallback , airqualityPromise} = require('../helpers/helper');

let url = 'https://api.openaq.org/v2/latest';

airquality.get('/callback', (req , callbackRes) => {
     airqualityCallback(url , (err, apiResp)=>{
         if(err){
             console.log(err);
             return callbackRes.status(500).send('Something went wrong');
         }else{
            return callbackRes.status(200).send(apiResp);
         }
     });
});

airquality.get('/promise', (req, callbackRes) => {
    airqualityPromise(url).then((apiResp)=>{
         return callbackRes.status(200).send(apiResp);
     }).catch((err)=>{
         return callbackRes.status(500).send('Something went wrong');
     });
});

airquality.get('/callbackHell',(req, res)=>{
    let totalResults= [];
    airqualityCallback('https://api.openaq.org/v2/latest?page=1' , (err, data1)=>{
        if(err){
            console.log(err);
            return res.status(500).send('Something went wrong');
        }else{
            airqualityCallback('https://api.openaq.org/v2/latest?page=2' , (err2, data2)=>{
        if(err2){
            console.log(err2);
            return res.status(500).send('Something went wrong');
        }else{
            airqualityCallback('https://api.openaq.org/v2/latest?page=3' , (err3, data3)=>{
        if(err3){
            console.log(err3);
            return res.status(500).send('Something went wrong');
        }else{
             totalResults.push(data1);
             totalResults.push(data2);
             totalResults.push(data3);
             return res.status(200).send(totalResults);
        }
    })
        }
    })
        }
    });
});

airquality.get('/promiseHeaven',(req, res)=>{
    airqualityPromise('https://api.openaq.org/v2/latest?page=1' ).then((data1)=>{
        airqualityPromise('https://api.openaq.org/v2/latest?page=2' ).then((data2)=>{
            airqualityPromise('https://api.openaq.org/v2/latest?page=3' ).then((data3)=>{
                let totalResults= [];
                totalResults.push(data1);
                totalResults.push(data2);
                totalResults.push(data3);
                return res.status(200).send(totalResults);
            }).catch((err3)=>{
                return res.status(500).send('Something went wrong');
            })
        }).catch((err2)=>{
            return res.status(500).send('Something went wrong');
        })
    }).catch((err1)=>{
        return res.status(500).send('Something went wrong');
    })
});

airquality.get('/asyncAwaitNonHell', async (req , res)=>{
    let totalResults = [];
    try {
        let data1 = await airqualityPromise('https://api.openaq.org/v2/latest?page=1');
        let data2 = await airqualityPromise('https://api.openaq.org/v2/latest?page=2');
        let data3 = await airqualityPromise('https://api.openaq.org/v2/latest?page=3');
        totalResults.push(data1);
                totalResults.push(data2);
                totalResults.push(data3);
        return res.status(200).send(totalResults);

    } catch (err) {
        return res.status(500).send('Something went wrong');
    }

});

airquality.get('/multiplePromises', (req, res) => {
    let promise1 = airqualityPromise('https://api.openaq.org/v2/latest?page=1');
    let promise2 = airqualityPromise('https://api.openaq.org/v2/latest?page=2');
    let promise3 = airqualityPromise('https://api.openaq.org/v2/latest?page=3');
    Promise.all([promise1, promise2, promise3]).then((data)=>{
        return res.status(200).send(data);
    }).catch((err)=>{
        return res.status(500).send('Something went wrong');
    });
});

airquality.get('/multiplePromisesRace', (req, res) =>{
    let promise1 = airqualityPromise('https://api.openaq.org/v2/latest?page=1');
    let promise2 = airqualityPromise('https://api.openaq.org/v2/latest?page=2');
    let promise3 = airqualityPromise('https://api.openaq.org/v2/latest?page=3');
    Promise.race([promise1, promise2, promise3]).then((data)=>{
        return res.status(200).send(data);
    }).catch((err)=>{
        return res.status(500).send('Something went wrong');
    });
});

module.exports = airquality;