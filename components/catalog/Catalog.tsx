import * as React from 'react';
import { ScrollView, Text, View } from 'react-native';

import { IconNames } from 'assets/icons/Icons';
import { useStoreMap } from 'effector-react';
import { useTranslation } from 'react-i18next';
import * as StoreBooks from 'stores/books';
import styled from 'styled-components/native';
import { colors, fonts, sizes } from 'styles/Variables';

import { Api, Book, Category } from 'api/apiSwagger';

import ContainerZone from 'components/ContainerZone';
import ViewPage from 'components/ViewPage';
import BookListItem from 'components/book/BookListItem';
import Button from 'components/button/Button';
import ContainerColumn from 'components/utils/ContainerColumn';
import Searchbar from 'components/utils/Searchbar';

const api = new Api();

interface Props {
	route: {
		params?: {
			search?: string;
		};
	};
}

const Catalog = ({ route }: Props) => {
	const { t } = useTranslation();

	const propSearch = route.params?.search;
	const [search, setSearch] = React.useState('');
	const [searchedBooks, setSearchedBooks] = React.useState<number[]>([]);
	const [categories, setCategories] = React.useState({ open: false, categories: [] });
	const [filters, setFilters] = React.useState([]);

	const storeBooks = useStoreMap(StoreBooks.store, (store) => store);

	const presentedBooks = () => {
		if (!!search) {
			if (filters.length === 0) {
				// If there is a search, apply the search filter to the books
				setSearchedBooks(searchedBookArray().map((book) => book.id));
			} else {
				// If there are filters and search, restart the book list
				const booksIdSearchedAndFiltered = searchedBookArray() //.filteredBooksArray()
					.filter((book) =>
						book.categories.some((category) => filters.some((filter) => filter.id === category.id)),
					)
					.map((book) => book.id);
				setSearchedBooks(booksIdSearchedAndFiltered);
			}
		} else {
			// If there are filters, filter the books
			if (filters.length > 0) {
				setSearchedBooks(filteredBookArray().map((book) => book.id));
			} else {
				// If no search and no filters, return all books
				setSearchedBooks(storeBooks.books.map((book) => book.id));
			}
		}
	};

	const filteredBookArray = (bookArray?: Book[]) => {
		return (bookArray ? bookArray : storeBooks.books).filter((book) =>
			book.categories.some((category) => filters.some((filter) => filter.id === category.id)),
		);
	};

	const searchedBookArray = () => {
		// Filter books based on search input
		return storeBooks.books.filter(
			(book) =>
				book.title.toLowerCase().includes(search.toLowerCase()) ||
				book.author.toLowerCase().includes(search.toLowerCase()),
		);
	};

	React.useEffect(() => {
		presentedBooks();
	}, [search]);

	React.useEffect(() => {
		if (propSearch !== '' && propSearch !== undefined) {
			setSearch(propSearch);
		}
	}, [propSearch]);

	React.useEffect(() => {
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
					<Searchbar value={{ search, setSearch }} onPress={presentedBooks} />
					<View>
						<Button
							label={t('catalog:filter')}
							iconName={categories.open ? IconNames.arrowUp : IconNames.arrowDown}
							onPress={() => setCategories((filters) => ({ ...filters, open: !filters.open }))}
							background={filters.length > 0 ? colors.primary : colors.secondary}
						/>
						{categories.open && (
							<ContainerZoneFilter>
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
							</ContainerZoneFilter>
						)}

						<TextLeft>
							{(!!search || filters.length > 0 ? searchedBooks.length : storeBooks.books.length) +
								t('catalog:result')}
						</TextLeft>
					</View>
					<ViewList>
						{storeBooks.books ? (
							searchedBooks.map((bookId, index) => <BookListItem key={index} bookId={bookId} />)
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
const ContainerZoneFilter = styled(ContainerZone)`
	margin: ${sizes.padding.main}px 0;
`;
const ViewInline = styled(View)`
	padding: ${sizes.padding.main}px;
	flex-direction: row;
	flex-wrap: wrap;
`;
const TextContent = styled(Text)`
	font: ${fonts.content};
`;
const TextLeft = styled(Text)`
	align-self: flex-end;
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
