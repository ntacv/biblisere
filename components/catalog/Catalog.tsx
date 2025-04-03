import * as React from 'react';
import { ScrollView, Text, View } from 'react-native';

import { useStoreMap } from 'effector-react';
import { useTranslation } from 'react-i18next';
import * as StoreBooks from 'stores/books';
import styled from 'styled-components/native';
import { fonts, sizes } from 'styles/Variables';

import { Api } from 'api/apiSwagger';

import ViewPage from 'components/ViewPage';
import BookListItem from 'components/book/BookListItem';
import ContainerColumn from 'components/utils/ContainerColumn';
import Searchbar from 'components/utils/Searchbar';

import { useNav } from 'utils/navigation';

const api = new Api();

const Catalog = () => {
	const navigation = useNav();
	const { t } = useTranslation();

	const storeBooks = useStoreMap(StoreBooks.store, (store) => store);

	React.useEffect(() => {
		api.books
			?.booksControllerFindAll({ sort: 'publicationDate', order: 'desc' })
			.then((response) => {
				StoreBooks.actions.setBooks(response.data);
			});
	}, [storeBooks.books]);

	return (
		<ViewPage header={true}>
			<ScrollViewContent>
				<ContainerColumn>
					<Searchbar />

					<ViewList>
						{!storeBooks ? (
							<TextContent>{t('config:loading')}</TextContent>
						) : (
							storeBooks.books.map((book, index) => <BookListItem key={index} bookProp={book} />)
						)}
					</ViewList>
				</ContainerColumn>
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
