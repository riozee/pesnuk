import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { useWebView } from '../../components/WebViewProvider';

// maybe i should rename this?
export default function Index() {
	const { showWebView, hideWebView, isWebViewVisible } = useWebView();

	return (
		<View style={styles.container}>
			<Text style={styles.text}>Timeline screen</Text>
			<Text style={styles.text}>Not yet implemented</Text>
			<TouchableOpacity
				style={[styles.fab, { bottom: 100 }]}
				onPress={isWebViewVisible ? hideWebView : showWebView}
			>
				<Text style={styles.fabText}>{isWebViewVisible ? 'Hide WebView' : 'Show WebView'}</Text>
			</TouchableOpacity>
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
	fab: {
		position: 'absolute',
		width: 60,
		height: 60,
		borderRadius: 30,
		backgroundColor: '#007AFF',
		right: 20,
		bottom: 20,
		justifyContent: 'center',
		alignItems: 'center',
		elevation: 8,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 3,
		zIndex: 20,
	},
	fabText: {
		color: 'white',
		fontSize: 16,
	},
});
