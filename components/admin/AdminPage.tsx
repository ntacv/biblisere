import * as React from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';

import { IconNames } from 'assets/icons/Icons';
import { useStoreMap } from 'node_modules/effector-react';
import { useTranslation } from 'react-i18next';
import * as StoreBooks from 'stores/books';
import * as StoreUser from 'stores/user';
import styled from 'styled-components/native';
import { colors, fonts, sizes } from 'styles/Variables';

import { Api } from 'api/apiSwagger';

import ViewPage from 'components/ViewPage';
import AdminBook from 'components/admin/AdminBook';
import AdminUser from 'components/admin/AdminUser';
import Button from 'components/button/Button';
import ContainerColumn from 'components/utils/ContainerColumn';

import useNav from 'utils/navigation';
import RouteNames from 'utils/routes';

const api = new Api();

const AdminPage = () => {
	const navigation = useNav();
	const { t } = useTranslation();
	const [userSection, setUserSection] = React.useState(true);
	const [bookSection, setBookSection] = React.useState(true);
	const [edit, setEdit] = React.useState(false);
	const [signup, setSignup] = React.useState(false);

	const storeBooks = useStoreMap(StoreBooks.store, (store) => store);
	const storeUser = useStoreMap(StoreUser.store, (store) => store);

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
			{storeUser.id.role !== 'ADMIN' && <Text>{t('admin:refused')}</Text>}
			{storeUser.token && storeUser.id.role === 'ADMIN' && (
				<>
					<ViewRow>
						<Button
							label={t('user:title')}
							iconName={IconNames.user}
							onPress={() => {
								setUserSection(true);
								setBookSection(false);
							}}
							background={userSection ? colors.secondary : colors.primary}
						/>
						<Button
							label={t('menu:books')}
							iconName={IconNames.book}
							onPress={() => {
								setUserSection(false);
								setBookSection(true);
							}}
							background={bookSection ? colors.secondary : colors.primary}
						/>
					</ViewRow>

					<ScrollViewContent>
						<ContainerColumn>
							{userSection && <AdminUser />}
							{bookSection && <AdminBook />}
						</ContainerColumn>
					</ScrollViewContent>
				</>
			)}
		</ViewPage>
	);
};

export default AdminPage;

const ScrollViewContent = styled(ScrollView)`
	flex: 1;
`;
const TextContent = styled(Text)`
	font: ${fonts.content};
`;
const ViewRow = styled(View)`
	flex-direction: row;
	justify-content: center;
	align-items: center;
	gap: ${sizes.padding.main}px;
	padding: ${sizes.padding.main}px;
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
