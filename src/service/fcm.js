import * as admin from 'firebase-admin';

const serviceAccount = require('~/service-account.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://sneaker-checker.firebaseio.com',
});

export const sendFCM = (token, notification) => {
    admin.messaging().send({
        notification,
        token,
    })
        .then((response) => {
        // Response is a message ID string.
            console.log('Successfully sent message:', response);
        })
        .catch((error) => {
            console.log('Error sending message:', error);
        });
}