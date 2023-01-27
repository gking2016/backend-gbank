const services = require('../index');
const conn = services.conn;

function CREATE_USER(user,account){
    // creation of user
    return new Promise((resolve,reject) => {
        conn.query(`SELECT * FROM USERS WHERE name='${user.name}'`,(err,result) => {
            if(err) reject(err);
            console.log(result);
            if(result.length !== 0) reject('User already exists');
            else {
                conn.query(`INSERT INTO USERS (ID,NAME,EMAIL,PASSWORD,MOBILE,ISADMIN) VALUES ('${user.id}','${user.name}','${user.email}','${user.password}','${user.mobile_no}',${user.isadmin})`,(err) => {
                    if(err) reject(err);
                });

                conn.query(`INSERT INTO ACCOUNTS (ACCOUNT_NUMBER,USERID,BALANCE,ACCOUNT_TYPE,IFSC) VALUES ('${account.id}','${account.user_id}','${account.balance}','${account.account_type}','${account.ifsc_code}')`,(err) => {
                    if(err) reject(err);
                    resolve('User created successfully');
                });

            }
        });
    })
}

function AUTH_USER(user){
    return new Promise((resolve,reject) => {
        conn.query(`SELECT ID,NAME,EMAIL,MOBILE FROM USERS WHERE email='${user.email}' AND password='${user.password}'`,(err,result) => {
            if(err) reject(err);
            if(result.length == 0) reject('User not found');
            resolve(result[0]);
        });
    });
}


function USERS(){
    return new Promise((resolve,reject) => {
        conn.query(`SELECT * FROM account_summary`,(err,result) => {
            if(err) reject(err);
            resolve(result);
        });
    });
}

function USER_DETAILS(id){
    return new Promise((resolve,reject) => {
        conn.query(`SELECT * FROM account_summary WHERE userid='${id}'`,(err,result) => {
            if(err) reject(err);
            resolve(result);
        });
    });
}


function DELETE_USER(id) {
    conn.query(`DELETE FROM USERS WHERE id='${id}'`,(err) => {
        if(err) return 'Error in deleting user';
    });

    conn.query(`DELETE FROM ACCOUNTS WHERE user_id='${id}'`,(err) => {
        if(err) return 'Error in deleting user';
    });

    return 'User deleted successfully';
}


module.exports = {
    USERS: USERS,
    CREATE_USER:CREATE_USER,
    USER_DETAILS: USER_DETAILS,
    AUTH_USER: AUTH_USER,
    DELETE_USER: DELETE_USER
}