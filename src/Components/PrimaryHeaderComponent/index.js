import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import styles from "./styles";
import { sharedStyles, blueColor } from "../../shared/styles";

const appIconImage = require("../../assets/images/app_icon.png");

const PrimaryHeaderComponent = (props) => {
    return (
        <View style={[ sharedStyles.rowContainer, styles.topBarStyle ]}>
            <View style={[ sharedStyles.rowContainer ]}>
                <View style={[ styles.appIconContainer ]}>
                    <Image source={appIconImage} style={[ styles.appIconStyle ]} />
                </View>
                <Text style={[ styles.topLabelStyle ]}>{ props.title }</Text>
            </View>
            {props.buttonLabel ? (
                <TouchableOpacity style={[ styles.topButtonStyle ]} onPress={ props.buttonOnPress }>
                    <Text style={[ styles.topButtonTextStyle, { color: blueColor } ]}>{ props.buttonLabel }</Text>
                </TouchableOpacity>
            ) : null}            
        </View>
    );
};

export default PrimaryHeaderComponent;
