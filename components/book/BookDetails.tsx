import * as React from 'react';
import { Text, View } from 'react-native';

import { useStoreMap } from 'effector-react';
import { useTranslation } from 'react-i18next';
import * as StoreBook from 'stores/books';
import * as StoreUser from 'stores/user';
import { styled } from 'styled-components/native';
import { fonts, sizes } from 'styles/Variables';

import { Api } from 'api/apiSwagger';

import ContainerZone from 'components/ContainerZone';
import ImageBook from 'components/image/ImageBook';
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
	// get the book in the store
	const book = storeBook.books.find((book) => book.id === bookId);

	return (
		<ContainerColumn>
			<ContainerZone>
				<ViewListItem>
					<ImageBook source={{ uri: book.imageUrl }} />
					<ViewSide>
						<View>
							<TextBold>{book.title}</TextBold>
							<TextContent>{book.author}</TextContent>
							<TextContent>
								{t('dates:month-year-long', { val: new Date(book.publicationDate) })}
							</TextContent>
							<TextContent>{book.quantity}</TextContent>
						</View>
						{storeUser.id?.canBorrow && <BorrowBook bookProp={book} />}
					</ViewSide>
				</ViewListItem>
			</ContainerZone>
		</ContainerColumn>
	);
};
export default BookDetails;

const ViewListItem = styled(View)`
	flex-direction: row;
`;
const ViewSide = styled(View)`
	flex: 1;
	justify-content: space-between;
	padding: 0 0 0 ${sizes.padding.main}px;
`;
const ViewButton = styled(View)`
	flex-direction: row;
	justify-content: flex-end;
`;
const TextContent = styled(Text)`
	font: ${fonts.content};
`;
const TextBold = styled(Text)`
	font: ${fonts.content};
	font-weight: bold;
`;
