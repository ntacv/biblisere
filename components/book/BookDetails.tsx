import * as React from 'react';
import { ScrollView, Text, View } from 'react-native';

import { useStoreMap } from 'effector-react';
import { useTranslation } from 'react-i18next';
import * as StoreBook from 'stores/books';
import * as StoreUser from 'stores/user';
import { styled } from 'styled-components/native';
import { fonts } from 'styles/Variables';

import ContainerZone from 'components/ContainerZone';
import ViewPage from 'components/ViewPage';
import ImageBook from 'components/image/ImageBook';
import ListRow from 'components/list/ListRow';
import TitleContent from 'components/text/TitleContent';
import ContainerColumn from 'components/utils/ContainerColumn';

import BorrowBook from './BorrowBook';

export interface ItemProps {
	bookId: number;
}

const BookDetails = (props) => {
	const { t } = useTranslation();

	const storeUser = useStoreMap(StoreUser.store, (store) => store);
	const books = useStoreMap(StoreBook.store, (store) => store.books);

	const bookId = props.route.params.bookId;
	const book = books.find((book) => book.id === bookId);

	const sameAuthorBooks = books
		?.filter((bookFiltered) => bookFiltered?.author === book?.author && bookFiltered.id !== bookId)
		.slice(0, 3)
		.map((book) => book.id);

	const sameCategoryBooks = books
		?.filter((bookFiltered) => {
			return bookFiltered?.categories.some((category) => {
				return book?.categories.some((categoryBook) => category.id === categoryBook.id);
			});
		})
		.slice(0, 3)
		.map((book) => book.id);

	return (
		<ViewPage header returnIcon>
			<ScrollViewContent>
				<ContainerColumn>
					<ContainerZone>
						<TitleContent label={book.title} />
						<ImageBookDetails height={300} source={{ uri: book.imageUrl }} />

						<TextBold>{book.author}</TextBold>

						<TextContent>
							{t('catalog:from') +
								t('dates:month-year-long', { val: new Date(book.publicationDate) })}
						</TextContent>

						<TextContent>
							{t('catalog:categories') + t('config:text:colon')}
							{book.categories
								.map((category) => {
									return category.name;
								})
								.join(', ')}
						</TextContent>

						<TextContent>{book.pages + t('catalog:pages')}</TextContent>
						{/* max 10 lines */}
						<TextContent numberOfLines={10}>
							{book.description}
							{t('lorem:long') + t('lorem:long')}
						</TextContent>

						{/* 3 books from author */}
						{sameAuthorBooks?.length > 0 && (
							<ListRow booksId={sameAuthorBooks} title={t('details:sameAuthor')} />
						)}

						{/* 3 books from the same category */}
						{sameCategoryBooks?.length > 0 && (
							<ListRow booksId={sameCategoryBooks} title={t('details:sameKind')} />
						)}

						{storeUser.id?.canBorrow && <BorrowBook bookId={book.id} />}
					</ContainerZone>
				</ContainerColumn>
			</ScrollViewContent>
		</ViewPage>
	);
};
export default BookDetails;

const ScrollViewContent = styled(ScrollView)`
	flex: 1;
`;
const ViewListItem = styled(View)`
	flex-direction: row;
`;
const ImageBookDetails = styled(ImageBook)`
	align-self: center;
`;
const TextContent = styled(Text)`
	font: ${fonts.content};
`;
const TextBold = styled(Text)`
	font: ${fonts.content};
	font-weight: bold;
`;
