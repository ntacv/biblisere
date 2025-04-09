import * as React from 'react';
import { Text } from 'react-native';

import { useStoreMap } from 'node_modules/effector-react';
import { useTranslation } from 'react-i18next';
import * as StoreBooks from 'stores/books';
import * as StoreUser from 'stores/user';
import styled from 'styled-components/native';
import { fonts } from 'styles/Variables';

import { Api, MAX_BOOKS } from 'api/apiSwagger';

import Button from 'components/button/Button';
import TitleContent from 'components/text/TitleContent';
import renderAlert from 'components/utils/renderAlert';

import useNav from 'utils/navigation';
import RouteNames from 'utils/routes';

const api = new Api();

const UserPage = () => {
	const navigation = useNav();
	const { t } = useTranslation();
	const [edit, setEdit] = React.useState(false);

	const storeBooks = useStoreMap(StoreBooks.store, (store) => store);
	const storeUser = useStoreMap(StoreUser.store, (store) => store);
	const user = storeUser.id;

	return (
		<>
			<TitleContent
				label={user ? user.firstName + ' ' + user.lastName : t('errors:notConnected')}
			/>
			<TextContent>{user.email}</TextContent>
			<TextContent>
				{t('user:membership') + t('dates:month-year-long', { val: new Date(user.createdAt) })}
			</TextContent>
			<TextContent>
				{!storeUser.id?.canBorrow ? (
					<Text>{t('user:cantBorrow')}</Text>
				) : (
					<>
						<Text>
							{t('user:borrowed', {
								val: storeUser.id?.books.length.toString(),
								max: MAX_BOOKS.toString(),
							})}
						</Text>
					</>
				)}
			</TextContent>

			<Button
				iconName="userX"
				label={t('menu:logout')}
				onPress={() => {
					renderAlert(t('menu:logout'), t('menu:logoutConfirm'), t('user:cancel'), {
						text: t('menu:logout'),
						onPress: () => {
							StoreUser.actions.logout();
							navigation.navigate(RouteNames.User);
						},
					});
				}}
			/>
		</>
	);
};
export default UserPage;

const TextContent = styled(Text)`
	font: ${fonts.content};
`;
