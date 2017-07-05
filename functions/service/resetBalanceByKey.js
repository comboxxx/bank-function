const admin = require('firebase-admin');
//admin.initializeApp(functions.config().firebase);
var _ = require('lodash');
var cors = require('cors')({ origin: '*' })


exports.resetByKey = function (req, res) {
cors(req, res, () => {
        var key = req.body.accountNumber;
        var rootRef = admin.database().ref()

        var transaction = rootRef.child('transactionHistory').once('value')
            .then((snap) => {
                var arrayHistory = _.values(snap.val());

                var list_filtered = _.filter(arrayHistory, (tran) => {
                    return tran.accountNumber == key;
                })


                var sumBalance = _.reduce(list_filtered, function (sum, history) {
                    return sum + history.amount
                }, 0);


                var userAccountBalanceRef = rootRef.child('bankUser').child(key).child('balance');

                userAccountBalanceRef.set(sumBalance, () => {
                    console.log(sumBalance)
                    res.status(200).send(sumBalance.toString());
                });
            })
    })
}
    