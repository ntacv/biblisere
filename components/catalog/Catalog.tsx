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

interface Props {
	route: {
		params?: {
			search?: string;
		};
	};
}

const Catalog = (props) => {
	const { t } = useTranslation();

	const propSearch = props.route.params?.search;
	const [search, setSearch] = React.useState('');
	const [searchedBooks, setSearchedBooks] = React.useState<number[]>([]);

	const storeBooks = useStoreMap(StoreBooks.store, (store) => store);

	const filterBooks = () => {
		// Filter books based on search input
		setSearchedBooks(
			storeBooks.books
				.filter(
					(book) =>
						book.title.toLowerCase().includes(search.toLowerCase()) ||
						book.author.toLowerCase().includes(search.toLowerCase()),
				)
				.map((book) => book.id),
		);
	};
	React.useEffect(() => {
		if (search !== '') {
			filterBooks();
		}
	}, [search]);

	React.useEffect(() => {
		if (propSearch !== '' && propSearch !== undefined) {
			setSearch(propSearch);
			filterBooks();
		}
	}, [propSearch]);

	return (
		<ViewPage header>
			<ScrollViewContent>
				<ContainerColumn>
					<Searchbar value={{ search, setSearch }} onPress={filterBooks} />
					<Text style={{ alignSelf: 'flex-end' }}>
						{(search !== '' ? searchedBooks.length : storeBooks.books.length) + t('catalog:result')}
					</Text>
					<ViewList>
						{storeBooks.books ? (
							search !== '' ? (
								// Display searched books
								searchedBooks.map((bookId, index) => <BookListItem key={index} bookId={bookId} />)
							) : (
								// Display all books
								storeBooks.books.map((book, index) => <BookListItem key={index} bookId={book.id} />)
							)
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
