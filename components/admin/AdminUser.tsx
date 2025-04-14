import * as React from 'react';
import { View } from 'react-native';

import { IconNames } from 'assets/icons/Icons';
import { useStoreMap } from 'node_modules/effector-react';
import { useTranslation } from 'react-i18next';
import StoreAdmin from 'stores/admin';
import * as StoreBooks from 'stores/books';
import * as StoreUser from 'stores/user';
import styled from 'styled-components/native';
import { colors, sizes } from 'styles/Variables';

import { Api } from 'api/apiSwagger';

import ContainerZone from 'components/ContainerZone';
import UserListItem from 'components/admin/UserListItem';
import Button from 'components/button/Button';
import TitleContent from 'components/text/TitleContent';
import Signup from 'components/user/Signup';

import Logger from 'utils/Logger';

const api = new Api();

const AdminUser = () => {
	const { t } = useTranslation();
	const [signup, setSignup] = React.useState(false);

	const storeBooks = useStoreMap(StoreBooks.store, (store) => store);
	const storeUser = useStoreMap(StoreUser.store, (store) => store);
	const storeAdmin = useStoreMap(StoreAdmin.store, (store) => store);

	React.useEffect(() => {
		if (storeUser.token) {
			api.admin
				?.adminControllerFindAllUsers({
					headers: { Authorization: `Bearer ${storeUser.token}` },
				})
				.then((response) => {
					StoreAdmin.actions.setUsers(response.data);
					Logger.info('Admin users', response.data);
				})
				.catch((error) => {
					Logger.warn('Error fetching admin users', error);
				});
		}
	}, []);

	return (
		<>
			<Button
				label={t('admin:add')}
				iconName={IconNames.userCheck}
				onPress={() => setSignup(!signup)}
				background={colors.secondary}
			/>
			{signup && (
				<ContainerZone>
					<Signup isAdmin />
				</ContainerZone>
			)}
			<TitleContent label={t('admin:users')} />
			<ViewList>
				{storeAdmin.users.length > 0 &&
					storeAdmin.users.map((user, index) => (
						<UserListItem key={index} userId={user.id} setSignup={setSignup} />
					))}
			</ViewList>
		</>
	);
};

export default AdminUser;

const ViewList = styled(View)`
	gap: ${sizes.padding.main}px;
`;
