import * as React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { DrawerActions } from '@react-navigation/native';
import Icon, { IconNames } from 'assets/icons/Icons';
import { useStoreMap } from 'effector-react';
import { useTranslation } from 'react-i18next';
import StoreAdmin from 'stores/admin';
import * as StoreUser from 'stores/user';
import styled from 'styled-components/native';
import { colors, sizes } from 'styles/Variables';

import { Api, bookStore, userStore } from 'api/apiSwagger';

import Button from 'components/button/Button';
import Title from 'components/text/Title';

import useNav from 'utils/navigation';
import RouteNames from 'utils/routes';

const api = new Api();

interface Props {
	returnIcon?: boolean;
}

function Header({ returnIcon }: Props) {
	const navigation = useNav();
	const { t } = useTranslation();

	const storeUser = useStoreMap(StoreUser.store, (store) => store);

	return (
		<ViewHeader>
			{!returnIcon && (
				<Button
					iconName={IconNames.menu}
					background={colors.clickable}
					onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
				/>
			)}
			{returnIcon && (
				<Button
					iconName={IconNames.arrowLeft}
					background={colors.clickable}
					onPress={() => navigation.goBack()}
				/>
			)}

			<TouchableHeader
				onPress={() => {
					userStore.update();
					bookStore.update();
					api.admin
						?.adminControllerFindAllUsers({
							headers: {
								Authorization: `Bearer ${storeUser.token}`,
							},
						})
						.then((response) => {
							StoreAdmin.actions.setUsers(response.data);
						})
						.catch((error) => {
							console.log('Error fetching users: ', error);
						});
					// navigation.navigate(RouteNames.Homepage);
				}}
			>
				<Title>
					<Icon
						iconName={IconNames.book}
						width={sizes.icons.title}
						height={sizes.icons.title}
						stroke={colors.primary}
						strokeWidth={3}
					/>

					<Text>{t('home:name')}</Text>
				</Title>
			</TouchableHeader>

			<Button
				iconName={storeUser.token ? IconNames.userCheck : IconNames.user}
				onPress={() => navigation.navigate(RouteNames.User)}
			/>
		</ViewHeader>
	);
}
export default Header;

const ViewHeader = styled(View)`
	flex-direction: row;
	padding: ${sizes.padding.main}px;
`;
const TouchableHeader = styled(TouchableOpacity)`
	flex: 1;
`;
