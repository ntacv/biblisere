import * as React from 'react';
import { ScrollView, Text, View } from 'react-native';

import { useStoreMap } from 'effector-react';
import { useTranslation } from 'react-i18next';
import * as StoreBook from 'stores/books';
import * as StoreUser from 'stores/user';
import { styled } from 'styled-components/native';
import { fonts } from 'styles/Variables';

import { Api } from 'api/apiSwagger';

import ContainerZone from 'components/ContainerZone';
import ViewPage from 'components/ViewPage';
import ImageBook from 'components/image/ImageBook';
import TitleContent from 'components/text/TitleContent';
import ContainerColumn from 'components/utils/ContainerColumn';

import BorrowBook from './BorrowBook';

const api = new Api();

export interface ItemProps {
	bookId: number;
}

const BookDetails = (props) => {
	const { t } = useTranslation();

	const storeUser = useStoreMap(StoreUser.store, (store) => store);

	const bookId = props.route.params.bookId;
	const storeBook = useStoreMap(StoreBook.store, (store) => store);

	const book = storeBook.books.find((book) => book.id === bookId);

	return (
		<ViewPage header>
			<ScrollViewContent>
				<ContainerColumn>
					<ContainerZone>
						<TitleContent label={book.title}></TitleContent>
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
						{/* 3 books from the same category */}

						{storeUser.id?.canBorrow && <BorrowBook bookProp={book} />}
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
