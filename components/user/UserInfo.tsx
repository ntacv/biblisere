import * as React from 'react';
import { Text } from 'react-native';

import { IconNames } from 'assets/icons/Icons';
import { useStoreMap } from 'node_modules/effector-react';
import { useTranslation } from 'react-i18next';
import * as StoreAdmin from 'stores/admin';
import * as StoreUser from 'stores/user';
import styled from 'styled-components/native';
import { colors, fonts } from 'styles/Variables';

import { Api, MAX_BOOKS } from 'api/apiSwagger';

import Button from 'components/button/Button';
import TitleContent from 'components/text/TitleContent';
import renderAlert from 'components/utils/renderAlert';

import useNav from 'utils/navigation';
import RouteNames from 'utils/routes';

const api = new Api();

const UserPage = (props) => {
	const navigation = useNav();
	const { t } = useTranslation();

	const { user } = useStoreMap(StoreUser.store, (store) => ({ user: store.id }));
	const storeAdmin = useStoreMap(StoreAdmin.store, (store) => store);

	return (
		<>
			<TitleContent label={user.firstName + ' ' + user.lastName} />
			<TextContent>{user.email}</TextContent>
			<TextContent>
				{t('user:membership') + t('dates:month-year-long', { val: new Date(user.createdAt) })}
			</TextContent>
			<TextContent>
				{user.canBorrow ? (
					<Text>
						{t('user:borrowed', {
							val: user.books.length.toString(),
							max: MAX_BOOKS.toString(),
						})}
					</Text>
				) : (
					<Text>{t('user:cantBorrow')}</Text>
				)}
			</TextContent>

			<Button
				label={t('user:edit')}
				iconName={IconNames.editLine}
				onPress={() => props.setEdit(true)}
				background={colors.secondary}
			/>

			<Button
				iconName="userX"
				label={t('menu:logout')}
				onPress={() => {
					renderAlert(t('menu:logout'), t('menu:logoutConfirm'), t('user:cancel'), {
						text: t('menu:logout'),
						onPress: () => {
							StoreUser.actions.logout();
							StoreAdmin.actions.logout();
							navigation.navigate(RouteNames.User);
						},
					});
				}}
				active
			/>
		</>
	);
};
export default UserPage;

const TextContent = styled(Text)`
	font: ${fonts.content};
`;
