import * as React from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';

import { useStoreMap } from 'node_modules/effector-react';
import { useTranslation } from 'react-i18next';
import * as StoreBooks from 'stores/books';
import * as StoreUser from 'stores/user';
import styled from 'styled-components/native';
import { fonts, sizes } from 'styles/Variables';

import { Api, MAX_BOOKS } from 'api/apiSwagger';

import ContainerZone from 'components/ContainerZone';
import ViewPage from 'components/ViewPage';
import BookListItem from 'components/book/BookListItem';
import Button from 'components/button/Button';
import TextAction from 'components/button/TextAction';
import TitleContent from 'components/text/TitleContent';
import Login from 'components/user/Login';
import ContainerColumn from 'components/utils/ContainerColumn';

import useNav from 'utils/navigation';
import RouteNames from 'utils/routes';

const api = new Api();

const UserPage = () => {
	const navigation = useNav();
	const { t } = useTranslation();

	const storeBooks = useStoreMap(StoreBooks.store, (store) => store);
	const storeUser = useStoreMap(StoreUser.store, (store) => store);
	const user = storeUser.id;

	const deleteAccount = () => {
		if (storeUser.id?.books.length > 0) {
			return renderAlert(t('user:deleteAccount'), t('user:deleteAccountError'), t('user:cancel'));
		}

		return renderAlert(t('user:deleteAccount'), t('user:deleteAccountConfirm'), t('user:cancel'), {
			text: t('user:delete'),
			onPress: () => {
				api.users?.usersControllerRemove({
					headers: { Authorization: `Bearer ${storeUser.token}` },
				});
				StoreUser.actions.logout();
				navigation.navigate(RouteNames.Homepage);
			},
		});
	};

	return (
		<ViewPage header>
			{!storeUser.token && <Login />}
			{storeUser.token && (
				<ScrollViewContent>
					{user && (
						<ContainerColumn>
							<ContainerZone>
								<TitleContent
									label={user ? user.firstName + ' ' + user.lastName : t('errors:notConnected')}
								/>
								<TextContent>{user.email}</TextContent>
								<TextContent>
									{t('user:membership') +
										t('dates:month-year-long', { val: new Date(user.createdAt) })}
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
					)}
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
