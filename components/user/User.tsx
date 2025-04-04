import * as React from 'react';
import { Alert } from 'react-native';

import { useStoreMap } from 'node_modules/effector-react';
import { useTranslation } from 'react-i18next';
import * as StoreUser from 'stores/user';
import styled from 'styled-components/native';
import { RouteNames } from 'types';

import { Api } from 'api/apiSwagger';

import ViewPage from 'components/ViewPage';
import Button from 'components/button/Button';
import TextAction from 'components/button/TextAction';
import Login from 'components/user/Login';
import UserStorePrint from 'components/user/UserStorePrint';
import ContainerColumn from 'components/utils/ContainerColumn';

import { useNav } from 'utils/navigation';

const api = new Api();

const UserPage = () => {
	const navigation = useNav();
	const { t } = useTranslation();

	const storeUser = useStoreMap(StoreUser.store, (store) => store);

	const deleteAccount = () => {
		if (storeUser.id?.books.length > 0) {
			return Alert.alert(t('user:deleteAccount'), t('user:deleteAccountError'), [
				{
					text: t('user:cancel'),
					style: 'cancel',
				},
			]);
		}

		return Alert.alert(t('user:deleteAccount'), t('user:deleteAccountConfirm'), [
			{
				text: t('user:cancel'),
				style: 'cancel',
			},
			{
				text: t('user:delete'),
				onPress: () => {
					api.users?.usersControllerRemove({
						headers: { Authorization: `Bearer ${storeUser.token}` },
					});
					StoreUser.actions.logout();
					navigation.navigate(RouteNames.Homepage);
				},
			},
		]);
	};

	return (
		<ViewPage header={true}>
			{!storeUser.token && <Login />}
			{storeUser.token && (
				<ScrollViewContent>
					<ContainerColumn>
						<UserStorePrint />

						<Button
							iconName="userX"
							align="center"
							label={t('menu:logout')}
							onPress={() => {
								AlertLogout(t, navigation);
							}}
						/>

						<TextAction label={t('user:deleteAccount')} onPress={deleteAccount} />
					</ContainerColumn>
				</ScrollViewContent>
			)}
		</ViewPage>
	);
};
export default UserPage;

const ScrollViewContent = styled.ScrollView`
	flex: 1;
`;

const AlertLogout = (t, navigation) => {
	return Alert.alert(t('menu:logout'), t('menu:logoutConfirm'), [
		{
			text: t('user:cancel'),
			style: 'cancel',
		},
		{
			text: t('menu:logout'),
			onPress: () => {
				StoreUser.actions.logout();
				navigation.navigate(RouteNames.User);
			},
		},
	]);
};
