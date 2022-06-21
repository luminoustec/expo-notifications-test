import * as Device from 'expo-device';
import React, { useEffect } from 'react';
import { Text, View, Button, Platform } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';

messaging().onMessage(async (msg) => {
    console.log('MSG -> ', msg);
    await notifee.displayNotification({
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
    await notifee.displayNotification({
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

async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
        const { status: existingStatus } =
            await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }
        token = (await Notifications.getDevicePushTokenAsync()).data;
        console.log(token);
    } else {
        alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    return token;
}
