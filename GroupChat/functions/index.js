const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.sendFollowerNotification = functions.database.ref('/chat/{pushId}').onWrite(event => {
console.log("event.params.text");
const original = event.data.val();
const name = original.name;
const message = original.text;
const payLoad = {
        notification:{
            title: 'Hii',
            body: 'Hiii',
            sound: "default"
        }
    };
    const options = {
       priority: "high",
       timeToLive: 60*60*2
   };
    admin.messaging().sendToTopic("group_chat", payLoad, options);

return true;

});
