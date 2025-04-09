import * as React from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';

import { IconNames } from 'assets/icons/Icons';
import { useStoreMap } from 'node_modules/effector-react';
import { useTranslation } from 'react-i18next';
import * as StoreBooks from 'stores/books';
import * as StoreUser from 'stores/user';
import styled from 'styled-components/native';
import { fonts, sizes } from 'styles/Variables';

import { Api } from 'api/apiSwagger';

import ContainerZone from 'components/ContainerZone';
import ViewPage from 'components/ViewPage';
import BookListItem from 'components/book/BookListItem';
import Button from 'components/button/Button';
import TextAction from 'components/button/TextAction';
import Login from 'components/user/Login';
import UpdateUser from 'components/user/UpdateUser';
import UserInfo from 'components/user/UserInfo';
import ContainerColumn from 'components/utils/ContainerColumn';

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
								{edit && <UpdateUser setEdit={setEdit} />}
								{!edit && (
									<>
										<UserInfo />
										<Button
											label={t('user:edit')}
											iconName={IconNames.editLine}
											onPress={() => setEdit(true)}
										/>
									</>
								)}
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
