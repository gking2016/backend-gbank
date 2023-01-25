const express = require('express');
const crypto = require('crypto');
const Userrouter = express.Router();
const services = require('../../services/index.js');
const UserServices = require('../../services/UserServices/index.js');
const FundsService = require('../../services/FundsServices/index.js');
const TransactionServices = require('../../services/TransactionServices/index.js');
const StatementServices = require('../../services/StatementServices/index.js');

require('dotenv').config()

Userrouter.get('/user', (req, res) => {
    res.send('welcome to user page');
});

Userrouter.post('/signup', (req, res) => {
    user_id = crypto.randomUUID();
    try{
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
        var message = UserServices.CREATE_USER(user,account);
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

Userrouter.post('/login', (req, res) => {
    try{
        const user = {
            email: req.query.email,
            password: req.query.password,
        }
        // console.log(user);
        const auth = UserServices.AUTH_USER(user);

        auth.then(
            (user) => {
                res.json({
                    user:user,
                })
            }
        ).catch((err) => {
            console.log(err);
            res.json({
                message:'User login failed',
            })
        })
        
    }
    catch(err){
        console.log(err);
        res.json({
            message:'User login failed',
        })
    }
});

// adding funds to account
Userrouter.post('/addfunds/user/:id', (req, res) => {
    try{
        var message = FundsService.ADD_FUNDS(req.params.id,req.query.amount);
        message.then(
            (message) => {
                res.json({
                    message:message,
                })
            }
        ).catch((err) => {
            console.log(err);
            res.json({
                message:'Error in adding funds',
            })
        })
    }
    catch(err){
        console.log(err);
        res.json({
            message:'Error in adding funds',
        })
    }
});

// getting transactions
Userrouter.get('/transactions', (req, res) => {
    try{
        const transactions = TransactionServices.TRANSACTIONS()
        transactions.then(
            (transactions) => {
                res.json({
                    transactions:transactions,
                })
            }
        ).catch((err) => {
            console.log(err);
            res.json({
                message:'Error in getting transactions',
            })
        })
    }
    catch(err){
        console.log(err);
        res.json({
            message:'Error in getting transactions',
        })
    }
});

// fund transfer
Userrouter.post('/fundtransfer', (req, res) => {
    try{
        const from_id = req.query.from_id;
        const to_id = req.query.to_id;
        const amount = req.query.amount;
        const transfer = FundsService.FUND_TRANSFER(from_id,to_id,amount);
        transfer.then(
            (message) => {
                res.json({
                    message:message,
                })
            }
        ).catch((err) => {
            console.log(err);
            res.json({
                message:err,
            })
        })
    } catch(err){
        console.log(err);
        res.json({
            message:'Error in fund transfer',
        })
    }   
});

// get account_summary 
Userrouter.get('/accountsummary/user/:id', (req, res) => {
    try{
        const account = StatementServices.ACCOUNT_SUMMARY(req.params.id);
        account.then(
            (account) => {
                res.json({
                    account:account,
                })
            }
        ).catch((err) => {
            console.log(err);
            res.json({
                message:'Error in getting account summary',
            })
        })
    }
    catch(err){
        console.log(err);
        res.json({
            message:'Error in getting account summary',
        })
    }
});

// get user details
Userrouter.get('/user/:id', (req, res) => {
    try{
        const user = UserServices.USER_DETAILS(req.params.id)
        user.then(
            (user) => {
                res.json({
                    user:user,
                })
            }
        ).catch((err) => {
            console.log(err);
            res.json({
                message:'Error in getting user details',
            })
        })
    }
    catch(err){
        console.log(err);
        res.json({
            message:'Error in getting user details',
        })
    }
});


// delete account
Userrouter.delete('/delete/user/:id', (req, res) => {
    try{
        var message = UserServices.DELETE_USER(req.params.id);
        res.json({
            message:message,
        });
    }
    catch(err){
        console.log(err);
        res.json({
            message:'Error in deleting account',
        })
    }
});

module.exports = Userrouter;