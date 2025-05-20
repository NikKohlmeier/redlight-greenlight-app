import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface LightButtonProps {
    color?: string;
    onPress: () => void;
    type?: 'score' | 'reset';
    text?: string,
}

const LightButton: React.FC<LightButtonProps> = ({ color, onPress, type = 'score', text }) => {
    const buttonStyle = type === 'reset' ? styles.resetButton : styles.scoreButton;

 return (
        <TouchableOpacity onPress={onPress}>
            <View style={[styles.baseButton, buttonStyle, color && type === 'score' && { backgroundColor: color }]}>
                <Text>{text}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    baseButton: {},
    resetButton: {
        backgroundColor: 'white',
        borderRadius: 10,
        height: 50,
        width: 160,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        borderWidth: 0.5,
        borderColor: 'grey',
        borderStyle: 'solid',
    },
    scoreButton: {
        borderRadius: 100,
        margin: 10,
        width: 100,
        height: 100,
    },
});

export default LightButton;