import * as React from 'react';
import { Alert, Text, View } from 'react-native';

import { useStoreMap } from 'node_modules/effector-react';
import { useTranslation } from 'react-i18next';
import * as StoreBooks from 'stores/books';
import * as StoreUser from 'stores/user';
import styled from 'styled-components/native';
import { fonts, sizes } from 'styles/Variables';
import { RouteNames } from 'types';

import { Api, MAX_BOOKS } from 'api/apiSwagger';

import ContainerZone from 'components/ContainerZone';
import ViewPage from 'components/ViewPage';
import BookListItem from 'components/book/BookListItem';
import Button from 'components/button/Button';
import TextAction from 'components/button/TextAction';
import TitleContent from 'components/text/TitleContent';
import Login from 'components/user/Login';
import ContainerColumn from 'components/utils/ContainerColumn';

import { useNav } from 'utils/navigation';

const api = new Api();

const UserPage = () => {
	const navigation = useNav();
	const { t } = useTranslation();

	const storeBooks = useStoreMap(StoreBooks.store, (store) => store);
	const storeUser = useStoreMap(StoreUser.store, (store) => store);
	const user = storeUser.id;

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
									align="center"
									label={t('menu:logout')}
									onPress={() => {
										AlertLogout(t, navigation);
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

const ScrollViewContent = styled.ScrollView`
	flex: 1;
`;
const TextContent = styled(Text)`
	font: ${fonts.content};
`;
const ViewList = styled(View)`
	gap: ${sizes.padding.main}px;
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
