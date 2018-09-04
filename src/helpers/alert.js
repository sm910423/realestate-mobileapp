import { Platform, ToastAndroid, AlertIOS } from "react-native";
import Toast from 'react-native-root-toast';

export const showErrorMessage = (message) => {
    if (Platform.OS === "ios") {
        AlertIOS.alert("ERROR", message);
    } else {
        ToastAndroid.show(message, ToastAndroid.SHORT);
    }
};

export const showToastMessage = (message) => {
    let toast = Toast.show(message, {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0
    });

    setTimeout(() => {
        if (toast) {
            Toast.hide(toast);
        }
    }, 3000);
}
