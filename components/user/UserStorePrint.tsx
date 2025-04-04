import React from 'react';
import { Text, View } from 'react-native';

import { useStoreMap } from 'effector-react';
import { useTranslation } from 'react-i18next';
import * as StoreUsers from 'stores/user';

const UserStorePrint = () => {
	const { t } = useTranslation();
	const storeUser = useStoreMap(StoreUsers.store, (store) => store);

	return (
		<View>
			<Text>
				{t('menu:login') +
					t('config:text:colon') +
					(storeUser.id?.email ? storeUser.id?.email : t('errors:notConnected'))}
			</Text>
			<Text>
				{storeUser.token}
				{storeUser.id?.email}
			</Text>
		</View>
	);
};
export default UserStorePrint;
