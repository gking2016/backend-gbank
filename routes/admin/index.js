const express = require('express');
const AdminRouter = express.Router();
const crypto = require('crypto');
const services = require('../../services/index.js');
const UserService = require('../../services/UserServices/index.js');
const TransactionServices = require('../../services/TransactionServices/index.js');
const cors = require('cors');


AdminRouter.use(
    cors({
        origin: '*'
    })
)

AdminRouter.get('/admin', (req, res) => {
    res.send('welcome to admin page');
});

AdminRouter.post('admin/createuser', (req, res) => {
    try{
        user_id = crypto.randomUUID();
        const user = {
            id: user_id,
            name: req.query.name,
            email: req.query.email,
            password: req.query.password,
            mobile_no: req.query.mobile_no,
            isadmin: false,
        }
        const account = {
            id:crypto.randomInt(100000000),
            user_id: user_id,
            balance: 0,
            account_type: 'SAVINGS',
            ifsc_code: 'SBIN0000000',
        }
        var message = UserService.CREATE_USER(user,account);
        res.json({
            message:message,
        })
    }
    catch(err){
        console.log(err);
        res.json({
            message:'User creation failed',
        })
    }
});


AdminRouter.post('/admin/user/delete/:id', (req, res) => {
    try{
        const user_id = req.params.id;
        var message = UserService.DELETE_USER(user_id);
        res.json({
            message:message,
        })
    }
    catch(err){
        console.log(err);
        res.json({
            message:'User deletion failed',
        })
    }
});


//checked and working
AdminRouter.get('/admin/transactions', (req, res) => {
    try{
        const transactions = TransactionServices.TRANSACTIONS();
        transactions.then((result) => {
            res.json({
                transactions:result,
            })
        }).catch((err) => {
            res.json({
                message:'Transaction fetch failed',
            })
        })
    }
    catch(err){
        console.log(err);
        res.json({
            message:'Transaction fetch failed',
        })
    }
});

//checked and working
AdminRouter.get('/admin/users',(req,res) => {
    try{
        const users = UserService.USERS();
        users.then((result) => {
            res.json({
                users:result,
            })
        }).catch((err) => {
            res.json({
                message:'User fetch failed',
            })
        })
    }
    catch(err){
        console.log(err);
        res.json({
            message:'User fetch failed',
        })
    }
});

// checked and working
AdminRouter.get('/admin/user/:id',(req,res) => {
    try{
        const user_id = req.params.id;
        const user = UserService.USER_DETAILS(user_id);
        user.then((result) => {
            res.json({
                user:result,
            })
        }).catch((err) => {
            res.json({
                message:'User fetch failed',
            })
        })
    }
    catch(err){
        console.log(err);
        res.json({
            message:'User fetch failed',
        })
    }
})

module.exports = AdminRouter;