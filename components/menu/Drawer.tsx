import * as React from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon, { IconNames } from 'assets/icons/Icons';
import { useStoreMap } from 'node_modules/effector-react';
import { useTranslation } from 'react-i18next';
import * as StoreUser from 'stores/user';
import { colors, sizes } from 'styles/Variables';

import DrawerContentCustom from 'components/menu/DrawerContentCustom';

import RouteNames from 'utils/routes';
import { routesArray } from 'utils/screens';

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
				drawerStyle: { backgroundColor: colors.background },
				drawerActiveBackgroundColor: colors.clickable,
				drawerInactiveBackgroundColor: colors.primary,
				drawerIcon: ({ focused, color }) => (
					<Icon
						iconName={IconNames.arrowRight}
						width={sizes.icons.search}
						stroke={focused ? colors.primary : colors.content}
					/>
				),
				drawerLabelStyle: {
					color: colors.content,
				},
				drawerItemStyle: {
					borderRadius: parseFloat(sizes.radius.in),
				},
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
