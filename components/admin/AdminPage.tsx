import * as React from 'react';
import { ScrollView, Text, View } from 'react-native';

import { IconNames } from 'assets/icons/Icons';
import { useStoreMap } from 'node_modules/effector-react';
import { useTranslation } from 'react-i18next';
import * as StoreUser from 'stores/user';
import styled from 'styled-components/native';
import { colors, sizes } from 'styles/Variables';

import ViewPage from 'components/ViewPage';
import AdminBook from 'components/admin/AdminBook';
import AdminUser from 'components/admin/AdminUser';
import Button from 'components/button/Button';
import ContainerColumn from 'components/utils/ContainerColumn';

const AdminPage = () => {
	const { t } = useTranslation();
	const [userSection, setUserSection] = React.useState(true);
	const [bookSection, setBookSection] = React.useState(false);

	const storeUser = useStoreMap(StoreUser.store, (store) => store);

	return (
		<ViewPage header>
			{storeUser.id?.role !== 'ADMIN' && <Text>{t('admin:refused')}</Text>}
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
const ViewRow = styled(View)`
	flex-direction: row;
	justify-content: center;
	align-items: center;
	gap: ${sizes.padding.main}px;
	padding: ${sizes.padding.main}px;
`;
