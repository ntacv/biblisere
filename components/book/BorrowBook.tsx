import * as React from 'react';
import { Text } from 'react-native';

import { useStoreMap } from 'effector-react';
import { useTranslation } from 'react-i18next';
import * as StoreBooks from 'stores/books';
import * as StoreUser from 'stores/user';
import { styled } from 'styled-components/native';
import { fonts } from 'styles/Variables';

import { MAX_BOOKS, bookStore } from 'api/apiSwagger';

import Button from 'components/button/Button';

export interface Props {
	bookId: number;
}

const BorrowBook = ({ bookId }: Props) => {
	const { t } = useTranslation();

	const storeUser = useStoreMap(StoreUser.store, (store) => store);

	const book = StoreBooks.store.getState().books.find((book) => book.id === bookId);

	const borrowBook = (bookId: number) => {
		// check if user has reached the limit of borrowed books
		if (storeUser.id?.books?.length >= MAX_BOOKS) {
			alert(t('catalog:limitBooks', { val: MAX_BOOKS }));
			return;
		}
		// else borrow a book and update user and catalog data
		bookStore.borrowBook(bookId);
	};

	const returnBook = (bookId: number) => {
		bookStore.returnBook(bookId);
	};

	return (
		<>
			<TextContent>
				{book.quantity > 0 ? t('catalog:available') : t('catalog:unavailable')}
			</TextContent>
			{book.quantity > 0 ? (
				<Button
					label={t('catalog:add')}
					iconName="bookmark"
					onPress={() => borrowBook(book.id)}
					alignLeft
				/>
			) : (
				<Button
					label={t('catalog:remove')}
					iconName="x"
					onPress={() => returnBook(book.id)}
					alignLeft
				/>
			)}
		</>
	);
};
export default BorrowBook;

const TextContent = styled(Text)`
	font: ${fonts.content};
	flex: 1;
`;
