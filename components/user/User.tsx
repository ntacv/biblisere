import * as React from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';

import { useStoreMap } from 'node_modules/effector-react';
import { useTranslation } from 'react-i18next';
import * as StoreUser from 'stores/user';
import styled from 'styled-components/native';
import { fonts, sizes } from 'styles/Variables';

import { Api, userStore } from 'api/apiSwagger';

import ContainerZone from 'components/ContainerZone';
import ViewPage from 'components/ViewPage';
import BookListItem from 'components/book/BookListItem';
import TextAction from 'components/button/TextAction';
import Login from 'components/user/Login';
import Signup from 'components/user/Signup';
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
	const [signup, setSignup] = React.useState(false);

	const { user } = useStoreMap(StoreUser.store, (store) => ({ user: store.id }));
	const { token } = useStoreMap(StoreUser.store, (store) => ({ token: store.token }));

	// user info are not synced but the login has been stored
	if (token && !user) {
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
			{!token && !signup && <Login setSignup={setSignup} />}
			{!token && signup && <Signup setSignup={setSignup} />}
			{token && user && (
				<ScrollViewContent>
					<ContainerColumn>
						<ContainerZone>
							{edit && <UpdateUser setEdit={setEdit} />}
							{!edit && <UserInfo setEdit={setEdit} />}
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
