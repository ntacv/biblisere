import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import * as StoreBooks from 'stores/books';

import BookDetails from 'components/book/BookDetails';

import RouteNames from 'utils/routes';

import Catalog from './Catalog';

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
			<Stack.Screen name={RouteNames.Catalog} component={Catalog} />

			<Stack.Screen name={RouteNames.Details} component={BookDetails} />
		</Stack.Navigator>
	);
};

export default CatalogNavigator;
