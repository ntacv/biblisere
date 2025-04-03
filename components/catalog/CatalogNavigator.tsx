import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import * as StoreBooks from 'stores/books';
import { RouteNames, routesCatalogArray } from 'types';

const Stack = createNativeStackNavigator();

const CatalogNavigator = () => {
	const { t } = useTranslation();
	const storeBooks = StoreBooks.store.getState();

	return (
		<Stack.Navigator
			id={undefined}
			initialRouteName={RouteNames.Catalog}
			screenOptions={{
				headerShown: false,
			}}
		>
			{routesCatalogArray.map((route) => (
				<Stack.Screen key={route.name} name={route.name} component={route.component} />
			))}
		</Stack.Navigator>
	);
};

export default CatalogNavigator;
