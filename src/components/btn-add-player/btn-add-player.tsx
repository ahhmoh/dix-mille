import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';


type ButtonAddPlayerProps = {
    onPressCommand: any;
};

export function ButtonAddPlayer({ onPressCommand }: ButtonAddPlayerProps) {
    const content = "+";

    return (
        <Pressable
            onPress={onPressCommand}
            style={({ pressed }) => [
                styles.btn,
                pressed ? styles.backgroundPressed : styles.backgroundIdle
            ]}
        >
            <Text style={styles.text}>{content}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    backgroundIdle: {
        backgroundColor: 'white'
    },
    backgroundPressed: {
        backgroundColor: 'rgb(210, 230, 255)'
    },
    btn: {
        display: "flex",
        justifyContent: 'center',
        alignItems: "center",
        width: 60,
        height: 60,
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 10,
        margin: 7,
    },
    text: {
        fontSize: 40
    }

});
