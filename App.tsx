import React, { useEffect } from 'react';
import { Text } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';

messaging().onMessage(async (msg) => {
    console.log('MSG -> ', msg);
    notifee.displayNotification({
        title: 'Notifee Title',
        body: 'Notifee Body',
        android: {
            pressAction: {
                id: 'default',
            },
            channelId: 'cucaracha',
            sound: 'notification_cucaracha',
        },
        ios: {
            sound: 'notificationcucaracha.wav',
        },
    });
});
messaging().setBackgroundMessageHandler(async (msg) => {
    console.log('MSG 2 -> ', msg);
    notifee
        .displayNotification({
            title: 'Notifee Title',
            body: 'Notifee Body',
            android: {
                pressAction: {
                    id: 'default',
                },
                channelId: 'cucaracha',
                sound: 'notification_cucaracha',
            },
            ios: {
                sound: 'notificationcucaracha.wav',
            },
        })
        .then((displayed) => console.log({ displayed }))
        .catch((displayedError) => console.log({ displayedError }));
});

export default function App() {
    useEffect(() => {
        const authorizationStatus = messaging()
            .requestPermission()
            .then((perm) => {
                console.log('Perm -> ', perm);
            });
        messaging()
            .getToken()
            .then((token) => {
                console.log('Messaging TOken -> ', token);
            });
    }, []);

    return <Text>Frontpage</Text>;
}
