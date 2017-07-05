const admin = require('firebase-admin');
//admin.initializeApp(functions.config().firebase);
var _ = require('lodash');
var cors = require('cors')({ origin: '*' })


var serviceAccount = require(__dirname + "/../service-key.json");

// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     databaseURL: "https://kitsakornfirebase.firebaseio.com"
// });




exports.run = function (req, res) {


    cors(req, res, () => {

        var rootRef = admin.database().ref()

        var transaction = rootRef.child('transactionHistory').once('value')
            .then((snap) => {
                var arrayHistory = _.values(snap.val());

                // _.map(arrayHistory, (historyData) => {
                //     var list_filtered = _.filter(historyData, (tran) => {
                //         return historyData.accountNumber == key;
                //     })


                var sumBalance = _.reduce(arrayHistory, function (sum, history) {

                    if (sum[history.accountNumber]) {
                        sum[history.accountNumber].amount += history.amount
                        if (sum[history.accountNumber][history.type]) {
                            sum[history.accountNumber][history.type] += history.amount


                        }
                        else {
                            // sum[history.accountNumber][history.type] = 0
                            sum[history.accountNumber][history.type] = history.amount
                            // sum[history.accountNumber].amount = history.amount
                        }

                    }
                    else {
                        sum[history.accountNumber] = {
                            [history.type]: history.amount,
                            amount: history.amount
                        }
                    }



                    return sum

                }, {});




                // { '4nahA5S7AGe5BuVnScGV7tZqxHk2': 
                //    { deposit: 66277,
                //      amount: 50647,
                //      withdraw: -4830,
                //      transfer: -10800 },
                //   GIjYCLUrtXdJVfMhciZAvVcaGQt1: 
                //    { deposit: 11000,
                //      amount: 21750,
                //      withdraw: -50,
                //      recieve: 15800,
                //      transfer: -5000 } }
                var bankRef = rootRef.child('bankUser')
                var obj = {}

                _.forEach(sumBalance, (value, key, list) => {

                    var allPath = key + '/balance';

                    obj[allPath] = value.amount


                })


                bankRef.update(obj, () => {

                    res.status(200).send(JSON.stringify(sumBalance));

                })


                // var userAccountBalanceRef = rootRef.child('bankUser').child(historyData.accountNumber).child('balance');
                // userAccountBalanceRef.set(sumBalance, () => {
                //     console.log(sumBalance)
                //     res.status(200).send(sumBalance.toString());
                // });
            })
        // })

    })


}


// exports.resetAll()