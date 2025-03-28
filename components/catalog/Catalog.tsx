import * as React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { DrawerActions } from '@react-navigation/native';
import { useStoreMap } from 'effector-react';
import { useTranslation } from 'react-i18next';
import * as StoreBooks from 'stores/books';
import styled from 'styled-components/native';
import { fonts, sizes } from 'styles/Variables';

import { Api } from 'api/apiSwagger';

import ViewPage from 'components/ViewPage';
import BookList from 'components/book/BookList';

import { useNav } from 'utils/navigation';

const api = new Api();

const Catalog = () => {
	const navigation = useNav();
	const { t } = useTranslation();

	const books = useStoreMap(StoreBooks.store, (store) => store);

	React.useEffect(() => {
		api.books
			?.booksControllerFindAll({ sort: 'publicationDate', order: 'desc' })
			.then((response) => {
				StoreBooks.actions.setBooks(response.data);
			});
	}, []);

	return (
		<ViewPage header={true}>
			<Text>{t('catalog:title')}</Text>

			<TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
				<Text>{t('menu:title')}</Text>
			</TouchableOpacity>

			<TouchableOpacity onPress={navigation.goBack}>
				<Text>{t('homepage:title')}</Text>
			</TouchableOpacity>

			<ScrollViewContent>
				<ViewList>
					{!books ? (
						<TextContent>{t('config:loading')}</TextContent>
					) : (
						books.books.map((book, index) => <BookList key={index} bookProp={book} />)
					)}
				</ViewList>
			</ScrollViewContent>
		</ViewPage>
	);
};
export default Catalog;

const ScrollViewContent = styled(ScrollView)`
	flex: 1;
`;
const ViewList = styled(View)`
	gap: ${sizes.padding.main}px;
`;
const TextContent = styled(Text)`
	font: ${fonts.content};
`;
const TextContentDate = styled(Text)`
	font: ${fonts.content};
	text-align: center;
	font-weight: bold;
`;
