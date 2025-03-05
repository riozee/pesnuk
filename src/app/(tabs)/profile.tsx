import { Text, View, StyleSheet } from 'react-native';

export default function AboutScreen() {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>Profile screen</Text>
			<Text style={styles.text}>Not yet implemented</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#25292e',
		justifyContent: 'center',
		alignItems: 'center',
	},
	text: {
		color: '#fff',
	},
});
