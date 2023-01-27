const services = require('../index');
const conn = services.conn;


function ACCOUNT_SUMMARY(id){
    return new Promise((resolve,reject) => {
        conn.query(`SELECT * FROM ACCOUNT_SUMMARY WHERE user_id='${id}'`,(err,result) => {
            if(err) reject(err);
            resolve(result);
        });
    });
}

module.exports = {
    ACCOUNT_SUMMARY:ACCOUNT_SUMMARY,
}