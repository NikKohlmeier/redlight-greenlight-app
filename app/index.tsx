import LightButton from "@/components/LightButton";
import Scoreboard from "@/components/Scoreboard";
import { Stack } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";

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
		// Hide the default header
		<Stack.Screen options={{ headerShown: false }} />

		<View
			style={{
			flex: 1,
			justifyContent: "center",
			alignItems: "center",
			}}
		>

			<Scoreboard redScore={redScore} greenScore={greenScore} />

			<View style={styles.buttonWrapper}>
				<LightButton color="red" onPress={handleRedLight} />
				<LightButton color="yellow" onPress={handleYellowLight} />
				<LightButton color="green" onPress={handleGreenLight} />
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
});
