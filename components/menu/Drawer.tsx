import { createDrawerNavigator } from '@react-navigation/drawer';
import { useTranslation } from 'react-i18next';
import { RouteNames, routesArray } from 'types';

import DrawerContentCustom from 'components/menu/DrawerContentCustom';

const Drawer = createDrawerNavigator();

const DrawerMenu = () => {
	const { t } = useTranslation();
	const isAdmin = true;

	return (
		<Drawer.Navigator
			id={undefined}
			initialRouteName={RouteNames.Homepage}
			backBehavior={'history'}
			screenOptions={{
				headerShown: false,
				drawerType: 'slide',
				drawerStyle: { backgroundColor: 'white' },
			}}
			drawerContent={(props) => <DrawerContentCustom {...props} />}
		>
			{routesArray.map((route) =>
				!isAdmin && route.name === 'Admin' ? null : (
					<Drawer.Screen
						key={route.name}
						name={route.name}
						component={route.component}
						options={{ title: t(route.options.title) }}
					/>
				),
			)}
		</Drawer.Navigator>
	);
};
export default DrawerMenu;
