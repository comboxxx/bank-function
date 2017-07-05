const functions = require('firebase-functions');
const admin = require('firebase-admin');
//admin.initializeApp(functions.config().firebase);
var _ = require('lodash');
var cors = require('cors')({ origin: '*' })
var qqqq = require('./service/resetAllBalance')
var resetByKey = require('./service/resetBalanceByKey')
var sumTotalBalance = require('./service/sumTotalBalance')
var serviceAccount = require( __dirname +  "/service-key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://kitsakornfirebase.firebaseio.com"
});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//


// return admin.database().ref('carresult').once('value',function(snapshot) {
//      var obj = snapshot.val();
//     console.log(snapshot.val());
//     res.status(200).send(obj);
//   });

exports.resetBalanceByKey = functions.https.onRequest((req, res) => {
    resetByKey.resetByKey(req,res);
})

exports.resetAllBalance = functions.https.onRequest((req, res) => {

       qqqq.run(req,res);
})


 
// })
// exports.resetBalanceByKey = functions.https.onRequest((request, response) => {
//     response.send("Hello from Firebase!");


//     var accountNumber = request.body.accountNumber;

//     var list_filtered = _.filter( trans,(tran)=>{
//         return tran.accountNumber == accountNumber;
//     })


//     var balance = _.reduce(list_filtered, (acc,tran)=> 
//     {
//         return acc + tran.amount
//     }, 0 )




// });

//  exports.helloWorld = functions.database.ref('/messages/{pushId}/original')
//     .onWrite(event => {
//       // Grab the current value of what was written to the Realtime Database.
//       const original = event.data.val();

//        return event.data.ref.parent.child('uppercase').set(uppercase);
//     });

exports.sumTotolBalance = functions.database.ref('/transactionHistory/{nodeKey}').onWrite(event => {

     return   sumTotalBalance.sumTotalBalance(event)
})
