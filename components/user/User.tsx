import * as React from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';

import { useStoreMap } from 'node_modules/effector-react';
import { useTranslation } from 'react-i18next';
import * as StoreUser from 'stores/user';
import styled from 'styled-components/native';
import { fonts, sizes } from 'styles/Variables';

import { Api, MAX_BOOKS, userStore } from 'api/apiSwagger';

import ContainerZone from 'components/ContainerZone';
import ViewPage from 'components/ViewPage';
import BookListItem from 'components/book/BookListItem';
import Button from 'components/button/Button';
import TextAction from 'components/button/TextAction';
import TitleContent from 'components/text/TitleContent';
import Login from 'components/user/Login';
import ContainerColumn from 'components/utils/ContainerColumn';

import Logger from 'utils/Logger';
import useNav from 'utils/navigation';
import RouteNames from 'utils/routes';

const api = new Api();

const UserPage = () => {
	const navigation = useNav();
	const { t } = useTranslation();

	const { user } = useStoreMap(StoreUser.store, (store) => ({ user: store.id }));
	const { token } = useStoreMap(StoreUser.store, (store) => ({ token: store.token }));

	// user info are not synced but the login has been stored
	if (token && !user) {
		Logger.info('Get user info');
		userStore.update();
	}

	const deleteAccount = () => {
		if (user && user.books.length > 0) {
			return renderAlert(t('user:deleteAccount'), t('user:deleteAccountError'), t('user:cancel'));
		}

		return renderAlert(t('user:deleteAccount'), t('user:deleteAccountConfirm'), t('user:cancel'), {
			text: t('user:delete'),
			onPress: () => {
				api.users?.usersControllerRemove({
					headers: { Authorization: `Bearer ${token}` },
				});
				StoreUser.actions.logout();
				navigation.navigate(RouteNames.Homepage);
			},
		});
	};

	return (
		<ViewPage header>
			{!token && <Login />}
			{token && user && (
				<ScrollViewContent>
					<ContainerColumn>
						<ContainerZone>
							<TitleContent label={user.firstName + ' ' + user.lastName} />
							<TextContent>{user.email}</TextContent>
							<TextContent>
								{t('user:membership') +
									t('dates:month-year-long', { val: new Date(user.createdAt) })}
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
						</ContainerZone>

						<ViewList>
							{user.books ? (
								user.books.map((book, index) => <BookListItem key={index} bookId={book.id} />)
							) : (
								<TextContent>{t('config:loading')}</TextContent>
							)}
						</ViewList>

						<TextAction label={t('user:deleteAccount')} onPress={deleteAccount} />
					</ContainerColumn>
				</ScrollViewContent>
			)}
		</ViewPage>
	);
};
export default UserPage;

const ScrollViewContent = styled(ScrollView)`
	flex: 1;
`;
const TextContent = styled(Text)`
	font: ${fonts.content};
`;
const ViewList = styled(View)`
	gap: ${sizes.padding.main}px;
`;

interface AlertButton {
	text: string;
	onPress: () => void;
	style?: 'cancel' | 'default' | 'destructive';
}

const renderAlert = (title: string, message: string, cancel: string, button?: AlertButton) => {
	return Alert.alert(
		title,
		message,
		button
			? [
					{
						text: cancel,
						style: 'cancel',
					},
					button,
				]
			: [
					{
						text: cancel,
						style: 'cancel',
					},
				],
	);
};
