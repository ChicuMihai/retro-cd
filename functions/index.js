const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

const admins = ['chicumihai@gmail.com','test@test.com']
exports.addDefaultUserRole = functions.auth.user().onCreate((user) => {
    let uid = user.uid;
    if(admins.includes(user.email)) return admin.auth().setCustomUserClaims(uid,{
        isAdmin: true
    }).then(() => admin.firestore().collection('users').doc(uid).update({refreshToken:new Date().getTime()})
    ).catch(error => {
        console.log(error);
    });
});