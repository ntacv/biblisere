import * as React from 'react';
import { RefreshControl, ScrollView, Text, View } from 'react-native';

import { IconNames } from 'assets/icons/Icons';
import { useStoreMap } from 'effector-react';
import { useTranslation } from 'react-i18next';
import * as StoreBooks from 'stores/books';
import styled from 'styled-components/native';
import { colors, fonts, sizes } from 'styles/Variables';

import { Book, Category, OrderType, SortsType, bookStore } from 'api/apiSwagger';

import ContainerZone from 'components/ContainerZone';
import ViewPage from 'components/ViewPage';
import BookListItem from 'components/book/BookListItem';
import Button from 'components/button/Button';
import ContainerColumn from 'components/utils/ContainerColumn';
import Searchbar from 'components/utils/Searchbar';

interface Props {
	route: {
		params?: {
			search?: string;
		};
	};
}

interface SortsState {
	open: boolean;
	order: SortsType;
}

const Catalog = ({ route }: Props) => {
	const { t } = useTranslation();

	const propSearch = route.params?.search;
	const [search, setSearch] = React.useState('');

	const [categories, setCategories] = React.useState({ open: false, categories: [] });
	const [filters, setFilters] = React.useState([]);
	const [ascendant, setAscendant] = React.useState(true);
	const [sorts, setSorts] = React.useState<SortsState>({
		open: false,
		order: SortsType.publicationDate,
	});

	const storeBooks = useStoreMap(StoreBooks.store, (store) => store);

	React.useEffect(() => {
		if (propSearch !== '' && propSearch !== undefined) {
			setSearch(propSearch);
		}
	}, [propSearch]);

	const filteredBookArray = (bookArray?: Book[]) =>
		(bookArray ? bookArray : storeBooks.books)?.filter((book) =>
			book.categories.some((category) => filters.some((filter) => filter.id === category.id)),
		);

	const searchedBookArray = () => {
		// Filter books based on search input
		return storeBooks.books?.filter(
			(book) =>
				book.title.toLowerCase().includes(search.toLowerCase()) ||
				book.author.toLowerCase().includes(search.toLowerCase()),
		);
	};

	React.useEffect(() => {
		if (!!propSearch) {
			setSearch(propSearch);
		}
	}, [propSearch]);

	React.useEffect(() => {
		const categoryUnique = storeBooks.books
			?.flatMap((book) => book.categories)
			.reduce(
				(acc, val) => {
					acc[val.id] = val;
					return acc;
				},
				{} as Record<number, Category>,
			);

		setCategories((filters) => ({
			...filters,
			categories: Object.values(categoryUnique ? categoryUnique : {}),
		}));
	}, []);

	React.useEffect(() => {
		// Update the book store with the selected sort
		bookStore.update(sorts.order, ascendant ? OrderType.asc : OrderType.desc);
	}, [sorts.order, ascendant]);

	const searchedBooks = React.useMemo(() => {
		if (!!search) {
			if (filters.length === 0) {
				// If there is a search, apply the search filter to the books
				return searchedBookArray().map((book) => book.id);
			} else {
				// If there are filters and search, restart the book list
				return filteredBookArray(searchedBookArray()).map((book) => book.id);
			}
		} else {
			// If there are filters, filter the books
			if (filters.length > 0) {
				return filteredBookArray().map((book) => book.id);
			} else {
				// If no search and no filters, return all books
				return storeBooks.books?.map((book) => book.id);
			}
		}
	}, [storeBooks.books, filters, search]);

	const renderCatagoryFilter = (category, index) => {
		const isActive = filters.find((filter) => filter.id === category.id);
		return (
			<TextCategory
				key={index}
				onPress={() => {
					setFilters((filters) =>
						isActive
							? filters.filter((filter) => filter.id !== category.id)
							: [...filters, category],
					);
				}}
				active={isActive}
			>
				{category.name + ','}
			</TextCategory>
		);
	};

	return (
		<ViewPage header>
			<ScrollViewContent
				refreshControl={<RefreshControl refreshing={false} onRefresh={() => bookStore.update()} />}
			>
				<ContainerColumn>
					<Searchbar value={{ search, setSearch }} />
					<ViewFilters>
						<Button
							label={t('components:filter:filter')}
							iconName={IconNames.tag}
							onPress={() => {
								setCategories((filters) => ({ ...filters, open: !filters.open }));
								setSorts((filters) => ({ ...filters, open: false }));
							}}
							background={filters.length > 0 ? colors.primary : colors.secondary}
						/>
						<Button
							label={t('components:filter:sort')}
							iconName={IconNames.barChart}
							onPress={() => {
								setSorts((filters) => ({ ...filters, open: !filters.open }));
								setCategories((filters) => ({ ...filters, open: false }));
							}}
							background={sorts.open ? colors.primary : colors.secondary}
						/>
						<Button
							iconName={IconNames.arrowUp}
							onPress={() => setAscendant(true)}
							background={ascendant ? colors.primary : colors.clickable}
						/>
						<Button
							iconName={IconNames.arrowDown}
							onPress={() => setAscendant(false)}
							background={!ascendant ? colors.primary : colors.clickable}
						/>
					</ViewFilters>
					{categories.open && (
						<ContainerZone>
							<ViewInline>
								{categories.categories.map((category, index) =>
									renderCatagoryFilter(category, index),
								)}
							</ViewInline>
						</ContainerZone>
					)}
					{sorts.open && (
						<ContainerZone>
							{Object.values(SortsType).map((sortName, index) => (
								<TextSort
									key={index}
									onPress={() => {
										setSorts((filters) => ({
											...filters,
											order: sortName,
										}));
									}}
									selected={sorts.order === sortName}
								>
									{t('components:sorts:' + sortName)}
								</TextSort>
							))}
						</ContainerZone>
					)}

					<TextLeft>
						{(!!search || filters.length > 0 ? searchedBooks.length : storeBooks.books?.length) +
							t('catalog:result')}
					</TextLeft>

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
const ViewFilters = styled(View)`
	flex-direction: row;
	justify-content: center;
	align-items: center;
	gap: ${sizes.padding.main}px;
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
const TextLeft = styled(Text)`
	align-self: flex-end;
`;
const TextCategory = styled(Text)<{ active?: boolean }>`
	font: ${fonts.content};
	color: ${colors.content};
	background-color: ${(props) => (props.active ? colors.primary : 'transparent')};
	padding: 3px;
`;

const TextSort = styled(TextCategory)`
	padding: ${sizes.padding.main}px;
	margin: ${3 - sizes.padding.main}px 0;
	border-radius: ${sizes.radius.in};
	background-color: ${(props) => (props.selected ? colors.primary : 'transparent')};
`;
