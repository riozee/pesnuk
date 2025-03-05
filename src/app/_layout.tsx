import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { WebViewProvider } from '../components/WebViewProvider';

export default function RootLayout() {
	return (
		<WebViewProvider>
			<Stack>
				<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
				<Stack.Screen name="+not-found" />
			</Stack>
			<StatusBar style="light" />
		</WebViewProvider>
	);
}
