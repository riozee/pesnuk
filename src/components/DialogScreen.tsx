import React, { useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import WebView from 'react-native-webview';
import { logger } from '../utils/logger';

const log = logger('components/DialogScreen.tsx');

interface DialogScreenProps {
	children: React.ReactNode;
	url: string;
	onUrlChange: (newUrl: string) => void;
	onClose: () => void;
	isWebViewVisible: boolean;
	webViewRef: React.RefObject<WebView>;
}

const DialogScreen: React.FC<DialogScreenProps> = ({
	children,
	url,
	onUrlChange,
	onClose,
	isWebViewVisible,
	webViewRef,
}) => {
	log.info(`Rendering DialogScreen (visible: ${isWebViewVisible}, url: ${url})`);

	useEffect(() => {
		if (isWebViewVisible) {
			log.info('DialogScreen became visible');
		} else {
			log.info('DialogScreen became hidden');
		}
	}, [isWebViewVisible]);

	const handleUrlChange = (newUrl: string) => {
		log.info(`URL input changed to: ${newUrl}`);
		onUrlChange(newUrl);
	};

	const handleClose = () => {
		log.info('Close button pressed');
		onClose();
	};

	const handleGoBack = () => {
		log.info('Back button pressed');
		webViewRef.current?.goBack();
	};

	const handleGoForward = () => {
		log.info('Forward button pressed');
		webViewRef.current?.goForward();
	};

	const handleReload = () => {
		log.info('Reload button pressed');
		webViewRef.current?.reload();
	};

	return (
		<View
			style={{ ...styles.screen, zIndex: isWebViewVisible ? 1 : -1 }}
			pointerEvents={isWebViewVisible ? 'auto' : 'none'}
		>
			<View style={styles.dialog}>
				<View style={styles.header}>
					<TextInput
						style={styles.addressBar}
						value={url}
						onChangeText={handleUrlChange}
						onSubmitEditing={() => log.info(`URL submitted: ${url}`)}
					/>
					<TouchableOpacity onPress={handleClose}>
						<Ionicons name="close" size={24} color="white" />
					</TouchableOpacity>
				</View>
				<View style={styles.content}>
					<View style={styles.webViewWrapper}>{children}</View>
				</View>
				<View style={styles.footer}>
					<TouchableOpacity onPress={handleGoBack}>
						<Ionicons name="arrow-back" size={24} color="white" />
					</TouchableOpacity>
					<TouchableOpacity onPress={handleGoForward}>
						<Ionicons name="arrow-forward" size={24} color="white" />
					</TouchableOpacity>
					<TouchableOpacity onPress={handleReload}>
						<Ionicons name="reload" size={24} color="white" />
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		justifyContent: 'center',
		backgroundColor: 'rgba(37, 41, 46, 0.75)',
		alignItems: 'center',
	},
	dialog: {
		width: '92%',
		height: '92%',
		backgroundColor: '#25292e',
		borderRadius: 10,
		overflow: 'hidden',
	},
	header: {
		height: 50,
		flexDirection: 'row',
		alignItems: 'center',
		padding: 10,
		backgroundColor: '#25292e',
	},
	addressBar: {
		flex: 1,
		height: '100%',
		backgroundColor: '#25292e',
		color: 'gray',
		borderRadius: 5,
		paddingHorizontal: 10,
		marginRight: 10,
	},
	content: {
		flex: 1,
		margin: 10,
	},
	footer: {
		height: 50,
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		backgroundColor: '#25292e',
	},
	webViewWrapper: {
		flex: 1,
		borderRadius: 5,
		overflow: 'scroll',
	},
});

export default DialogScreen;
