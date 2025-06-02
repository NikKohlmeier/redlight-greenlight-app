import React from 'react';
import { StyleSheet, View } from 'react-native';

interface HistoryItemProps {
    color: string,
}

const HistoryItem: React.FC<HistoryItemProps> = ({ color }) => {
    return (
        <View style={[styles.historyItem, { backgroundColor: color }]} />
    );
};

const styles = StyleSheet.create({
    historyItem: {
        width: 20,
        height: 20,
        margin: 2,
    },
});

export default HistoryItem;
