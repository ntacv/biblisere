import * as React from 'react';
import { ScrollView, Text, View } from 'react-native';

import { IconNames } from 'assets/icons/Icons';
import { useStoreMap } from 'effector-react';
import { useTranslation } from 'react-i18next';
import * as StoreBooks from 'stores/books';
import styled from 'styled-components/native';
import { colors, fonts, sizes } from 'styles/Variables';

import { Api, Category } from 'api/apiSwagger';

import ViewPage from 'components/ViewPage';
import BookListItem from 'components/book/BookListItem';
import Button from 'components/button/Button';
import ContainerColumn from 'components/utils/ContainerColumn';
import Searchbar from 'components/utils/Searchbar';

import Logger from 'utils/Logger';

const api = new Api();

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
	const [categories, setCategories] = React.useState({ open: false, categories: [] });
	const [filters, setFilters] = React.useState([]);

	const storeBooks = useStoreMap(StoreBooks.store, (store) => store);

	const presentedBooks = () => {
		Logger.info('presentedBooks', searchedBooks);
		if (!!search) {
			const bookFromSearch = storeBooks.books.filter(
				(book) =>
					book.title.toLowerCase().includes(search.toLowerCase()) ||
					book.author.toLowerCase().includes(search.toLowerCase()),
			);
			setSearchedBooks(bookFromSearch.map((book) => book.id));

			// If there are filters, filter the searched books
			if (filters.length > 0) {
				const books = storeBooks.books
					.filter(
						(book) =>
							searchedBooks.includes(book.id) &&
							book.categories.some((category) =>
								filters.some((filter) => filter.id === category.id),
							),
					)
					.map((book) => book.id);
				setSearchedBooks(books);
			}
		} else {
			// If there are filters, filter the books
			if (filters.length > 0) {
				const books = storeBooks.books.filter((book) =>
					book.categories.some((category) => filters.some((filter) => filter.id === category.id)),
				);
				setSearchedBooks(books.map((book) => book.id));
			}
			// If no search and no filters, return all books
			else {
				setSearchedBooks(storeBooks.books.map((book) => book.id));
			}
		}
	};

	const filterBooks = () => {
		// Filter books based on selected categories
		const filteredBooks = storeBooks.books.filter((book) =>
			book.categories.some((category) => filters.some((filter) => filter.id === category.id)),
		);

		const filteredBooksIds = searchedBooks.filter((bookId) =>
			filteredBooks.some((book) => book.id === bookId),
		);
		setSearchedBooks(filteredBooks.map((book) => book.id));
	};

	const searchBooks = () => {
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
			searchBooks();
			presentedBooks();
		}
	}, [search]);

	React.useEffect(() => {
		if (propSearch !== '' && propSearch !== undefined) {
			setSearch(propSearch);
		}
	}, [propSearch]);

	React.useEffect(() => {
		Logger.info('Filters: ', filters);
		Logger.info('serached books: ', searchedBooks);
		if (filters.length > 0) {
			filterBooks();
		}
		presentedBooks();
	}, [filters]);

	React.useEffect(() => {
		const categoryUnique = storeBooks.books
			.flatMap((book) => book.categories)
			.reduce(
				(acc, val) => {
					acc[val.id] = val;
					return acc;
				},
				{} as Record<number, Category>,
			);

		setCategories((filters) => ({
			...filters,
			categories: Object.values(categoryUnique),
		}));
	}, []);

	return (
		<ViewPage header>
			<ScrollViewContent>
				<ContainerColumn>
					<Searchbar value={{ search, setSearch }} onPress={searchBooks} />
					<View>
						<Button
							label={t('catalog:filter')}
							iconName={IconNames.arrowDown}
							onPress={() => setCategories((filters) => ({ ...filters, open: !filters.open }))}
							background={colors.secondary}
						/>
						{categories.open && (
							<ViewInline>
								{categories.categories.map((category, index) =>
									filters.find((filter) => filter.id === category.id) ? (
										<TextSelected
											key={index}
											onPress={() => {
												setFilters((filters) =>
													filters.filter((filter) => filter.id !== category.id),
												);
											}}
										>
											{category.name + ','}
										</TextSelected>
									) : (
										<TextToSelect
											key={index}
											onPress={() => {
												setFilters((filters) => [...filters, category]);
											}}
										>
											{category.name + ','}
										</TextToSelect>
									),
								)}
							</ViewInline>
						)}

						<Text style={{ alignSelf: 'flex-end' }}>
							{(!!search || filters.length > 0 ? searchedBooks.length : storeBooks.books.length) +
								t('catalog:result')}
						</Text>
					</View>
					<ViewList>
						{storeBooks.books ? (
							searchedBooks.map((bookId, index) => <BookListItem key={index} bookId={bookId} />)
						) : (
							/* !!search || filters.length > 0 ? (
								// Display searched books
								searchedBooks.map((bookId, index) => <BookListItem key={index} bookId={bookId} />)
							) : (
								// Display all books
								storeBooks.books.map((book, index) => <BookListItem key={index} bookId={book.id} />)
							) */
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
const ViewInline = styled(View)`
	padding: ${sizes.padding.main}px;
	flex-direction: row;
	flex-wrap: wrap;
`;
const TextContent = styled(Text)`
	font: ${fonts.content};
`;
const TextCategory = styled(Text)`
	font: ${fonts.content};
	color: ${colors.content};
	padding: 3px;
`;
const TextSelected = styled(TextCategory)`
	background-color: ${colors.primary};
`;
const TextToSelect = styled(TextCategory)``;
