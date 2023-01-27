const mysql = require('mysql');
require('dotenv').config();

const conn = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'examly',
    database:'GBANK',
});

conn.connect((err) => {
    if (err) throw err;
    console.log('connected');
});

function getDateTime() {
    var date = new Date();
    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;
    var min = date.getMinutes();
    var sec = date.getSeconds();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;
    var day = date.getDate();

    return {
        date:year + "-" + month + "-" + day,
        time:hour + ":" + min + ":" + sec
    };
}

module.exports = {
    dateTime:getDateTime,
    conn:conn
};