import { Tabs } from 'expo-router';

import Ionicons from '@expo/vector-icons/Ionicons';

export default function TabLayout() {
	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: '#ffd33d',
				headerShown: false,
				tabBarStyle: {
					backgroundColor: '#25292e',
				},
				tabBarPosition: 'top',
				tabBarShowLabel: false,
				tabBarIconStyle: { marginTop: 5 },
			}}
		>
			<Tabs.Screen
				name="notifications"
				options={{
					title: 'Notifications',
					tabBarIcon: ({ color, focused }) => (
						<Ionicons
							name={focused ? 'notifications' : 'notifications-outline'}
							color={color}
							size={24}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="index"
				options={{
					title: 'Timeline',
					tabBarIcon: ({ color, focused }) => (
						<Ionicons name={focused ? 'newspaper' : 'newspaper-outline'} color={color} size={24} />
					),
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					title: 'Profile',
					tabBarIcon: ({ color, focused }) => (
						<Ionicons name={focused ? 'person' : 'person-outline'} color={color} size={24} />
					),
				}}
			/>
			<Tabs.Screen
				name="about"
				options={{
					title: 'About',
					tabBarIcon: ({ color, focused }) => (
						<Ionicons
							name={focused ? 'information-circle' : 'information-circle-outline'}
							color={color}
							size={24}
						/>
					),
				}}
			/>
		</Tabs>
	);
}
