import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { logger } from '../utils/logger';

const log = logger('components/Notification.tsx');

interface NotificationProps {
	title: string;
	date: string;
	imageUrl: string;
	onPress: () => void;
	read: boolean;
}

export default function Notification({ title, date, imageUrl, onPress, read }: NotificationProps) {
	log.info(`Rendering notification: ${title} (read: ${read})`);

	useEffect(() => {
		log.info(`Notification mounted: ${title}`);
		return () => {
			log.info(`Notification unmounted: ${title}`);
		};
	}, [title]);

	const handlePress = () => {
		log.info(`Notification pressed: ${title}`);
		onPress();
	};

	const handleImageError = () => {
		log.error(`Failed to load image for notification: ${title}, URL: ${imageUrl}`);
	};

	log.info(`Using background color: ${read ? '#25292e' : '#333'} for notification: ${title}`);

	return (
		<TouchableOpacity
			onPress={handlePress}
			style={{ ...styles.card, ...(read ? { backgroundColor: '#25292e' } : {}) }}
		>
			<Image source={{ uri: imageUrl }} style={styles.image} onError={handleImageError} />
			<View style={styles.cardContent}>
				<Text style={styles.cardTitle}>{title}</Text>
				<Text style={styles.cardText}>{date}</Text>
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	card: {
		flexDirection: 'row',
		backgroundColor: '#333',
		padding: 10,
		borderRadius: 8,
		marginBottom: 20,
	},
	image: {
		width: 50,
		height: 50,
		marginRight: 10,
		borderRadius: 10,
	},
	cardContent: {
		flex: 1,
	},
	cardTitle: {
		color: '#fff',
		fontSize: 16,
		marginBottom: 5,
	},
	cardText: {
		color: '#aaa',
		fontSize: 12,
	},
});
