import * as React from 'react';
import { ScrollView, Text, View } from 'react-native';

import { useStoreMap } from 'effector-react';
import { useTranslation } from 'react-i18next';
import * as StoreBooks from 'stores/books';
import styled from 'styled-components/native';
import { fonts, sizes } from 'styles/Variables';

import ViewPage from 'components/ViewPage';
import BookListItem from 'components/book/BookListItem';
import ContainerColumn from 'components/utils/ContainerColumn';
import Searchbar from 'components/utils/Searchbar';

const Catalog = () => {
	const { t } = useTranslation();
	const [loading, setLoading] = React.useState(true);

	const storeBooks = useStoreMap(StoreBooks.store, (store) => store);

	return (
		<ViewPage header>
			<ScrollViewContent>
				<ContainerColumn>
					<Searchbar />
					<ViewList>
						{storeBooks.books ? (
							storeBooks.books.map((book, index) => <BookListItem key={index} bookId={book.id} />)
						) : (
							<TextContent>{t('config:loading')}</TextContent>
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
