import Notification from 'components/Notification';
import { useWebView } from 'components/WebViewProvider';
import { parseHTML } from 'utils/parseHTML';
import { NotificationType, notificationScraper } from 'utils/scrapers/notifications';
import { simulateClickScript } from 'utils/simulateClick';
import React, { useCallback, useEffect, useState, useRef } from 'react';
import {
	Text,
	View,
	StyleSheet,
	RefreshControl,
	ActivityIndicator,
	FlatList,
	Alert,
} from 'react-native';
import { logger } from 'utils/logger';

const log = logger('app/(tabs)/notifications.tsx');

export default function NotificationsScreen() {
	log.info('Rendering NotificationsScreen');
	const [notifications, setNotifications] = useState<NotificationType[]>([]);
	const [refreshing, setRefreshing] = useState(false);
	const [loading, setLoading] = useState(true);
	const WebViewContext = useWebView();
	const webViewRef = useRef(WebViewContext);

	useEffect(() => {
		webViewRef.current = WebViewContext;
	}, [WebViewContext]);

	const getNotifications = useCallback(async () => {
		log.info('Starting getNotifications function');
		try {
			log.info('Loading Facebook notifications URL');
			await webViewRef.current.loadUrl('https://www.facebook.com/notifications');

			log.info('Parsing HTML content');
			const dom = await parseHTML(webViewRef.current);
			log.info('DOM parsed successfully');

			log.info('Running notification scraper');
			const results = notificationScraper(dom);
			log.info(`Scraper returned: ${results.length} notifications`);

			setNotifications(results);
		} catch (err) {
			log.error(`Error in getNotifications: ${err}`);
			Alert.alert('Error', err ? String(err) : 'Something went wrong while loading notifications.');
			setNotifications([]);
		}
	}, []);

	const onRefresh = () => {
		log.info('Refresh triggered');
		setRefreshing(true);
		getNotifications().finally(() => {
			log.info('Refresh complete');
			setRefreshing(false);
		});
	};

	useEffect(() => {
		log.info('NotificationsScreen mounted, fetching initial notifications');
		getNotifications().finally(() => {
			log.info('Initial notifications loading complete');
			setLoading(false);
		});

		return () => {
			log.info('NotificationsScreen unmounting');
		};
	}, []);

	const handleNotificationPress = (item: NotificationType) => {
		log.info(`Notification pressed: ${item.title}`);
		webViewRef.current
			.executeScript(simulateClickScript(item.elementPath))
			.then(res => {
				log.info(`Click simulation result: ${JSON.stringify(res)}`);
				log.info('Showing WebView after notification click');
				webViewRef.current.showWebView();
			})
			.catch(err => {
				log.error(`Error simulating click: ${err}`);
				Alert.alert('Error', 'Failed to open notification');
			});
	};

	log.info(`Rendering FlatList with ${notifications.length} notifications`);
	return (
		<FlatList
			data={notifications}
			keyExtractor={item => item.title + item.date}
			renderItem={({ item }) => (
				<Notification
					title={item.title}
					date={item.date}
					imageUrl={item.imageUrl}
					read={item.read}
					onPress={() => handleNotificationPress(item)}
				/>
			)}
			style={styles.container}
			refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
			ListHeaderComponent={() => (
				<View>
					<Text style={styles.text}>Notifications</Text>
					{loading && <ActivityIndicator size="large" color="#ffd33d" />}
				</View>
			)}
			ListEmptyComponent={() =>
				!loading && <Text style={styles.emptyText}>No notifications found.</Text>
			}
			contentContainerStyle={{ flexGrow: 1 }}
		/>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#25292e',
		padding: 20,
	},
	text: {
		color: '#fff',
		marginBottom: 20,
	},
	emptyText: {
		color: '#fff',
		textAlign: 'center',
		marginTop: 20,
	},
});
