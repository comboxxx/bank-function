var _ = require('lodash');
exports.sumTotalBalance =    function (event) {

    var transaction = event.data.val();

    var accountNumber = transaction.accountNumber;
    var amount = transaction.amount;
    var rootRef = event.data.ref.parent.parent;

    var userAccountBalanceRef = rootRef.child('bankUser').child(accountNumber).child('balance');

    return userAccountBalanceRef.once('value').
        then((snap) => {

            var currentBalance = snap.val();

            var newBalance = currentBalance + amount;

            return userAccountBalanceRef.set(newBalance);

        })
}
