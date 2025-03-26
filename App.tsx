import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import DrawerMenu from 'components/menu/Drawer';

export default function App() {
	return (
		<NavigationContainer>
			<SafeAreaProvider>
				<DrawerMenu />
			</SafeAreaProvider>
		</NavigationContainer>
	);
}
