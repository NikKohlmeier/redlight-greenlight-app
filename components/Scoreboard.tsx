import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface ScoreboardProps {
    redScore: number;
    greenScore: number;
}

const Scoreboard: React.FC<ScoreboardProps> = ({ redScore, greenScore }) => {
    return (
        <View style={styles.scoreboard}>
            <View style={styles.score}>
                <Text style={styles.scoreText}>Red</Text>
                <Text style={styles.scoreText}>{redScore}</Text>
            </View>
            <View style={styles.score}>
                <Text style={styles.scoreText}>Green</Text>
                <Text style={styles.scoreText}>{greenScore}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    scoreboard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    score: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        borderWidth: 2,
        borderColor: 'black',
        width: '40%',
        backgroundColor: 'white',
    },
    scoreText: {
        fontSize: 46,
    }
});

export default Scoreboard;