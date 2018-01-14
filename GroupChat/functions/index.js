const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
exports.addMessage = functions.https.onRequest((req, res) => {
  // Grab the text parameter.
  const original = req.query.text;
  // Push the new message into the Realtime Database using the Firebase Admin SDK.
  admin.database().ref('/messages').push({original: original}).then(snapshot => {
    // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
    res.redirect(303, snapshot.ref);
  });
});



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
