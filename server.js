const mysql = require('mysql');

const conn = mysql.createConnection({
    host:'localhost',
    database:"GBANK",
    user:'root',
    password:'examly',
    multipleStatements:true
});

const sql = `
INSERT INTO TRANSACTIONS VALUES(
    'd5bd1888-4a9e-4375-b528-3612d665bd12',
    '254139136',
    '254139136',
    1000,
    '2021-01-01',
    'DEBIT',
    'DEBITED BY ADMIN'
);
`

conn.query(sql,(err) => {
    if(err) throw err;
    else console.log("Completed");
})