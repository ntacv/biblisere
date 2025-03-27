import * as React from 'react';
import { Text, View } from 'react-native';

import { DrawerActions } from '@react-navigation/native';
import Icon from 'assets/icons/Icons';
import { useStoreMap } from 'effector-react';
import { useTranslation } from 'react-i18next';
import * as StoreBooks from 'stores/books';
import * as StoreUser from 'stores/user';
import styled from 'styled-components/native';
import { colors, sizes } from 'styles/Variables';
import { RouteNames } from 'types';

import { Api } from 'api/apiSwagger';

import Title from 'components/Title';
import ViewPage from 'components/ViewPage';
import Button from 'components/button/Button';
import Content from 'components/homepage/Content';

import { useNav } from 'utils/navigation';

const api = new Api();

function Homepage() {
	const navigation = useNav();
	const { t } = useTranslation();

	const books = useStoreMap(StoreBooks.store, (store) => store);
	const user = useStoreMap(StoreUser.store, (store) => store);

	React.useEffect(() => {
		api.books?.booksControllerFindAll().then((response) => {
			StoreBooks.actions.setBooks(response.data);
		});
	}, []);

	return (
		<ViewPage>
			<ViewFilters>
				<Text>{t('components:filter:title')}</Text>
			</ViewFilters>

			<ViewHeader>
				<Button
					iconName="menu"
					background={colors.clickable}
					onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
				/>

				<Title>
					<Icon
						iconName="book"
						width={sizes.icons.title}
						height={sizes.icons.title}
						stroke={colors.primary}
						strokeWidth={3}
					/>
					<Text>{t('home:name')}</Text>
				</Title>

				<Button iconName="user" onPress={() => navigation.navigate(RouteNames.User)} />
			</ViewHeader>

			<Content />
		</ViewPage>
	);
}
export default Homepage;

const ViewHeader = styled(View)`
	display: flex;
	flex-direction: row;
	padding: ${sizes.padding.main}px ${sizes.padding.main}px;
`;
const ViewFilters = styled(View)`
	display: none;
	background: ${colors.filters};
`;
