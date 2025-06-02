import LightButton from "@/components/LightButton";
import Scoreboard from "@/components/Scoreboard";
import { LinearGradient } from 'expo-linear-gradient';
import { Stack } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  	const [redScore, setRedScore] = React.useState(0);
  	const [greenScore, setGreenScore] = React.useState(0);

	function handleRedLight() {
		setRedScore(redScore + 1);
	}

	function handleYellowLight() {
		setGreenScore(greenScore + 2);
	}

	function handleGreenLight() {
		setGreenScore(greenScore + 1);
	}

	function handleReset() {
		setRedScore(0);
		setGreenScore(0);
	}

	return (
		<>
		{/* Get rid of the header that Expo slaps in there */}
		<Stack.Screen options={{ headerShown: false }} />

		<LinearGradient style={styles.headerWrap}
			colors={['#de5959', '#e0cb5e', '#81bf7a']}
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
		minHeight: 80,
	},
	headerMessage: {
		textAlign: 'center',
		paddingTop: 30,
		color: 'white',
		fontSize: 30,
		fontWeight: 'bold',
	},
});
