import * as React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import { useTranslation } from 'react-i18next';
import * as StoreUser from 'stores/user';
import { styled } from 'styled-components/native';
import { fonts, sizes } from 'styles/Variables';
import RouteNames from 'utils/routes';

import { Api, Book } from 'api/apiSwagger';

import ContainerZone from 'components/ContainerZone';
import ImageBook from 'components/image/ImageBook';

import Logger from 'utils/Logger';
import { useNav } from 'utils/navigation';

const api = new Api();

export interface ItemProps {
	book: Book;
}

const borrowBook = (book: Book) => {
	const token = StoreUser.store.getState().token;

	api.books
		.booksControllerBorrow(book.id, {
			headers: { Authorization: `Bearer ${token}` },
		})
		.catch((error) => {
			Logger.warn('Error borrowing book:', error);
		});
};

const BookListItem = ({ book }: ItemProps) => {
	const { t } = useTranslation();
	const navigation = useNav();

	const storeUser = StoreUser.store.getState();

	return (
		<TouchableOpacity
			onPress={() => navigation.navigate(RouteNames.Details, { bookId: book.id } as any)}
		>
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
							{storeUser.id?.canBorrow && <TextContent>{book.quantity}</TextContent>}
						</View>
						{storeUser.id?.canBorrow && <BorrowBook bTouchableOpac} />}
					</ViewSide>
				</ViewListItem>
			</ContainerZone>
		</TouchableOpacity>
	);
};
export default BookListItem;

const ViewListItem = styled(View)`
	flex-direction: row;
	padding-left: ${sizes.padding.main}px;
`;
const ViewSide = styled(View)`
	flex: 1;
	justify-content: space-between;
	padding: 0 0 0 ${sizes.padding.main}px;
`;

const TextContent = styled(Text)`
	font: ${fonts.content};
`;
const TextBold = styled(Text)`
	font: ${fonts.content};
	font-weight: bold;
`;
