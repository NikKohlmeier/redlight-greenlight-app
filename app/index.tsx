import HistoryItem from "@/components/HistoryItem";
import LightButton from "@/components/LightButton";
import Scoreboard from "@/components/Scoreboard";
import { LinearGradient } from 'expo-linear-gradient';
import { Stack } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  	const [redScore, setRedScore] = React.useState(0);
  	const [greenScore, setGreenScore] = React.useState(0);
	const [historyTable, setHistoryTable] = React.useState<string[]>([]);
	const appRed = "#de5959";
	const appYellow = "#e0cb5e";
	const appGreen = "#81bf7a";

	function handleRedLight() {
		setRedScore(redScore + 1);
		setHistoryTable([...historyTable, appRed]);
	}

	function handleYellowLight() {
		setGreenScore(greenScore + 2);
		setHistoryTable([...historyTable, appYellow]);
	}

	function handleGreenLight() {
		setGreenScore(greenScore + 1);
		setHistoryTable([...historyTable, appGreen]);
	}

	function handleReset() {
		setRedScore(0);
		setGreenScore(0);
		setHistoryTable([]);
	}

	return (
		<>
		{/* Get rid of the header that Expo slaps in there */}
		<Stack.Screen options={{ headerShown: false }} />

		<LinearGradient style={styles.headerWrap}
			colors={[appRed, appYellow, appGreen]}
			start={{ x: 0, y: 0 }}
			end={{ x: 1, y: 0 }}
		>
			<Text style={styles.headerMessage}>Redlight Greenlight</Text>	
		</LinearGradient>
		<View
			style={{
			flex: 1,
			justifyContent: "center",
			alignItems: "center",
			}}
		>

			<Scoreboard redScore={redScore} greenScore={greenScore} />

			<View style={styles.historyTable}>
				{historyTable.map((color, index) => (
					<HistoryItem color={color} key={index} />
				))}
			</View>

			<View style={styles.buttonWrapper}>
				<LightButton color="#de5959" onPress={handleRedLight} />
				<LightButton color="#e0cb5e" onPress={handleYellowLight} />
				<LightButton color="#81bf7a" onPress={handleGreenLight} />
			</View>

			<LightButton type="reset" onPress={handleReset} text="Reset" />
		</View>
		</>
	);
}

const styles = StyleSheet.create({
	buttonWrapper: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	headerWrap: {
		width: '100%',
		minHeight: 100,
	},
	headerMessage: {
		textAlign: 'center',
		paddingTop: 50,
		color: 'white',
		fontSize: 30,
		fontWeight: 'bold',
	},
	historyTable: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		width: '100%',
	},
});
