import * as React from 'react';
import { Text, View } from 'react-native';

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

	const user = useStoreMap(StoreUser.store, (store) => store.id);
	const book = useStoreMap(StoreBooks.store, (store) => store.books).find(
		(book) => book.id === bookId,
	);

	const bookBorrowed = user?.books.map((self) => self.id).includes(bookId);

	const borrowBook = (bookId: number) => {
		// check if user has reached the limit of borrowed books
		user?.books.length >= MAX_BOOKS
			? alert(t('catalog:limitBooks', { val: MAX_BOOKS }))
			: // else borrow a book and update user and catalog data
				bookStore.borrowBook(bookId);
	};

	const returnBook = (bookId: number) => {
		bookStore.returnBook(bookId);
	};

	return (
		<>
			{user?.canBorrow && (
				<>
					<TextContent>
						{book?.quantity > 0
							? t('catalog:available', { val: book.quantity })
							: t('catalog:noStock')}
					</TextContent>

					{bookBorrowed ? (
						<Button
							label={t('catalog:remove')}
							iconName="x"
							onPress={() => returnBook(book.id)}
							alignLeft
							active
						/>
					) : (
						book.quantity > 0 && (
							<Button
								label={t('catalog:add')}
								iconName="bookmark"
								onPress={() => borrowBook(book.id)}
								alignLeft
								active
							/>
						)
					)}
				</>
			)}
			{user && !user?.canBorrow && (
				<>
					<ViewFlex />
					{bookBorrowed && (
						<Button
							label={t('catalog:remove')}
							iconName="x"
							onPress={() => returnBook(book.id)}
							alignLeft
							active
						/>
					)}
				</>
			)}
		</>
	);
};
export default BorrowBook;

const ViewFlex = styled(View)`
	flex: 1;
`;
const TextContent = styled(Text)`
	font: ${fonts.content};
	flex: 1;
`;
