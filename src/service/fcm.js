import serviceAccount from '~/config/service-account.json';
import * as admin from 'firebase-admin';

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://sneaker-checker.firebaseio.com',
});

export const sendFCM = (token, notification, data) => {
    admin.messaging().send({
        notification,
        data,
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