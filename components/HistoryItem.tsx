import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';

interface HistoryItemProps {
    color: string,
}

const HistoryItem: React.FC<HistoryItemProps> = ({ color }) => {
    // Get window width
    const windowWidth = Dimensions.get('window').width;

    // Desired number of columns
    const numberOfColumns = 6;

    // Desired margin between items horizontally
    const itemMargin = 5; // You can adjust this value

    // Calculate item width
    const baseItemWidth = windowWidth / numberOfColumns;
    const itemWidth = baseItemWidth - itemMargin * 2; // Subtract margin from both sides

    return (
        <View style={[
            styles.historyItemBase,
            {
                width: itemWidth,
                height: itemWidth,
                backgroundColor: color,
            },
            { marginHorizontal: itemMargin, marginVertical: itemMargin }
        ]} />
    );
};

const styles = StyleSheet.create({
    historyItemBase: {
        // Base styles that don't depend on dynamic calculations
        // For example, borderRadius, borderWidth, etc.
    },
});

export default HistoryItem;
