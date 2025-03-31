import * as React from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { useStoreMap } from 'node_modules/effector-react';
import { useTranslation } from 'react-i18next';
import * as StoreUser from 'stores/user';
import { RouteNames, routesArray } from 'types';

import DrawerContentCustom from 'components/menu/DrawerContentCustom';

const Drawer = createDrawerNavigator();

const DrawerMenu = () => {
	const { t } = useTranslation();

	const storeUser = useStoreMap(StoreUser.store, (store) => store);
	const isAdmin = React.useMemo(() => storeUser.id?.role === 'ADMIN', [storeUser.id]);

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
				!isAdmin && route.name === RouteNames.Admin ? null : (
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
