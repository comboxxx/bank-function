var _ = require('lodash');

var fs = require('fs')
let list = [
    {
        name: "win",
        balance: 700000
    },
    {
        name: "winny",
        balance: 500
    }
]


var obj = JSON.parse(fs.readFileSync(__dirname + '/list_bank.json', 'utf8'));

// var singer = ["a", "b", "c", "a"]
var singer = [1, 2, 3, 2]
var objects = {};
let i = 0
let some = _.reduce(obj.accounts, function (acc, vote) {


    if (acc[vote.accountNumber]) {

        acc[vote.accountNumber].amount += vote.amount;
        acc[vote.accountNumber][vote.type] += vote.amount;
        acc[vote.accountNumber].bills++
        if (vote.type == "transfer") {
            if (vote.amount < 0) {
                acc[vote.accountNumber].transferOut += vote.amount
            }
            else {
                acc[vote.accountNumber].transferIn += vote.amount
            }
        }




    }
    else {
        debugger
        acc[vote.accountNumber] = {
            amount: vote.amount,
            bills: 1,
            deposit: 0,
            withdraw: 0,
            transfer: 0,
            transferIn: 0,
            transferOut: 0,
            date: {}


        }
        acc[vote.accountNumber][vote.type] += vote.amount;
        acc[vote.accountNumber].bills++
        if (vote.type == "transfer") {
            if (vote.amount < 0) {
                acc[vote.accountNumber].transferOut += vote.amount
            }
            else {
                acc[vote.accountNumber].transferIn += vote.amount
            }
        }

    }



    if (acc[vote.accountNumber]['date'][vote.date]) {
        acc[vote.accountNumber]['date'][vote.date].amount += vote.amount;
        acc[vote.accountNumber]['date'][vote.date][vote.type] += vote.amount;
        acc[vote.accountNumber]['date'][vote.date].bills++
        if (vote.type == "transfer") {
            if (vote.amount < 0) {
                acc[vote.accountNumber]['date'][vote.date].transferOut += vote.amount
            }
            else {
                acc[vote.accountNumber]['date'][vote.date].transferIn += vote.amount
            }
        }

    } else {
        acc[vote.accountNumber]['date'][vote.date] =
            {

                amount: vote.amount,
                bills: 1,
                deposit: 0,
                withdraw: 0,
                transfer: 0,
                transferIn: 0,
                transferOut: 0,

            }
        acc[vote.accountNumber]['date'][vote.date][vote.type] += vote.amount;
        acc[vote.accountNumber]['date'][vote.date].bills++
        if (vote.type == "transfer") {
            if (vote.amount < 0) {
                acc[vote.accountNumber]['date'][vote.date].transferOut += vote.amount
            }
            else {
                acc[vote.accountNumber]['date'][vote.date].transferIn += vote.amount
            }
        }

    }
    return acc



}, {})

// let some = _.reduce(obj.accounts, function (acc, vote) {


//     if (acc[vote.date]) {
//         acc[vote.date]++
//     }
//     else {
//        acc[vote.date ] = 1
//     }
//     return acc



// }, {})


console.log(JSON.stringify(some))