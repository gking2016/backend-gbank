const crypto = require('crypto');
const services = require('../index.js');


const conn = services.conn;

function ADD_FUNDS(user_id,amount){
    return new Promise((resolve,reject) => {
        conn.query(`UPDATE ACCOUNTS SET balance=balance+${amount} WHERE userid='${user_id}'`,(err) => {
            if(err) reject(err);
        });
        conn.query(`INSERT INTO TRANSACTIONS VALUES(
            '${crypto.randomUUID()}',
            '${user_id}',
            '${user_id}',
            ${amount},
            '${services.dateTime().date}',
            'DEBIT',
            'RECHARGE'
        );`,(err) => {
            if(err) reject(err);
            else{
                resolve('Funds added successfully');
            }
        })
        
    });

}

function FUND_TRANSFER(from_id,to_id,amount){
    console.log(from_id,to_id,amount);
    return new Promise((resolve,reject) => {
        conn.query(`SELECT balance FROM ACCOUNTS WHERE userid='${from_id}'`,(err,result) => {
            if(err) reject(err);
            if(result.length == 0) reject('User not found');
            // console.log(result);
            if(result[0].balance < amount) reject('Insufficient funds');
            conn.query(`UPDATE ACCOUNTS SET balance=balance-${amount} WHERE userid='${from_id}'`,(err) => {
                if(err) reject(err);
            });
            conn.query(`UPDATE ACCOUNTS SET balance=balance+${amount} WHERE userid='${to_id}'`,(err) => {
                if(err) reject(err);
            });
            conn.query(`INSERT INTO TRANSACTIONS VALUES(
                '${crypto.randomUUID()}',
                '${from_id}',
                '${to_id}',
                ${amount},
                '${services.dateTime().date}',
                'CREDIT',
                'TRANSFER'
            )`,(err) => {
                if(err) reject(err);
            });
            conn.query(`INSERT INTO TRANSACTIONS VALUES(
                '${crypto.randomUUID()}',
                '${to_id}',
                '${from_id}',
                ${amount},
                '${services.dateTime.date}',
                'CREDIT',
                'TRANSFER'
            )`,(err) => {
                if(err) reject(err);
            });
            resolve('Transaction successful');
        });
    });
}

module.exports = {
    ADD_FUNDS:ADD_FUNDS,
    FUND_TRANSFER:FUND_TRANSFER,
}