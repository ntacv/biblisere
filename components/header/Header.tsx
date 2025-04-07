import * as React from 'react';
import { Text, View } from 'react-native';

import { DrawerActions } from '@react-navigation/native';
import Icon, { IconNames } from 'assets/icons/Icons';
import { useStoreMap } from 'effector-react';
import { useTranslation } from 'react-i18next';
import * as StoreUser from 'stores/user';
import styled from 'styled-components/native';
import { colors, sizes } from 'styles/Variables';

import Button from 'components/button/Button';
import Title from 'components/text/Title';

import useNav from 'utils/navigation';
import RouteNames from 'utils/routes';

function Header() {
	const navigation = useNav();
	const { t } = useTranslation();

	const storeUser = useStoreMap(StoreUser.store, (store) => store);

	return (
		<ViewHeader>
			<Button
				iconName={IconNames.menu}
				background={colors.clickable}
				onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
			/>

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
