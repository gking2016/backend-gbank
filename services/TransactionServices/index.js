const services = require('../index');
const conn = services.conn;

function TRANSACTIONS(){
    return new Promise((resolve,reject) => {
        conn.query(`SELECT * FROM TRANSACTIONS`,(err,result) => {
            if(err) reject(err);
            resolve(result);
        });
    });
}

module.exports = {
    TRANSACTIONS:TRANSACTIONS
}