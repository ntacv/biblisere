import * as React from 'react';
import { Alert } from 'react-native';

import { useStoreMap } from 'node_modules/effector-react';
import { useTranslation } from 'react-i18next';
import * as StoreUser from 'stores/user';
import { RouteNames } from 'types';

import { Api } from 'api/apiSwagger';

import ViewPage from 'components/ViewPage';
import Button from 'components/button/Button';
import Login from 'components/user/Login';
import UserStorePrint from 'components/user/UserStorePrint';
import ContainerColumn from 'components/utils/ContainerColumn';

import { useNav } from 'utils/navigation';

const api = new Api();

const UserPage = () => {
	const navigation = useNav();
	const { t } = useTranslation();

	const storeUser = useStoreMap(StoreUser.store, (store) => store);

	return (
		<ViewPage header={true}>
			{!storeUser.token && <Login />}
			<ContainerColumn>
				<UserStorePrint></UserStorePrint>

				<Button
					iconName="userX"
					align="center"
					label={t('menu:logout')}
					onPress={() => {
						AlertLogout(t, navigation);
					}}
				/>
			</ContainerColumn>
		</ViewPage>
	);
};
export default UserPage;

const AlertLogout = (t, navigation) => {
	return Alert.alert(t('menu:logout'), t('menu:logoutConfirm'), [
		{
			text: t('menu:cancel'),
			style: 'cancel',
		},
		{
			text: t('menu:ok'),
			onPress: () => {
				StoreUser.actions.logout();
				navigation.navigate(RouteNames.User);
			},
		},
	]);
};
