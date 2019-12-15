import serviceAccount from '~/config/service-account.json';
import * as admin from 'firebase-admin';

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://sneaker-checker.firebaseio.com',
});

export const sendFCM = (token, notification, payload) => {
    admin.messaging().send({
        data: {
            title: notification.title,
            body: notification.body,
            payload: JSON.stringify(payload),
        },
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