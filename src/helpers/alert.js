import { Platform, ToastAndroid, AlertIOS } from "react-native";

export const showErrorMessage = (message) => {
    if (Platform.OS === "ios") {
        AlertIOS.alert("ERROR", message);
    } else {
        ToastAndroid.show(message, ToastAndroid.SHORT);
    }
};
