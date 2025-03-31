import * as React from 'react';
import { View } from 'react-native';

import { useTranslation } from 'react-i18next';
import * as StoreUser from 'stores/user';
import { styled } from 'styled-components/native';

import { Api, Book } from 'api/apiSwagger';

import Button from 'components/button/Button';

const api = new Api();

export interface ItemProps {
	bookProp: Book;
}

const borrowBook = (book: Book) => {
	const token = StoreUser.store.getState().token;

	api.books
		.booksControllerBorrow(book.id, {
			headers: { Authorization: `Bearer ${token}` },
		})
		.then((response) => {
			console.log('Book borrowed:', response);
		})
		.catch((error) => {
			console.error('Error borrowing book:', error);
		});
};

const BorrowBook = (props: ItemProps) => {
	const book = props.bookProp;

	const { t } = useTranslation();

	return (
		<ViewButton>
			{book.quantity > 0 ? (
				<Button label={t('catalog:add')} iconName="bookmark" onPress={() => borrowBook(book)} />
			) : (
				<Button label={t('catalog:remove')} iconName="x" />
			)}
		</ViewButton>
	);
};
export default BorrowBook;

const ViewButton = styled(View)`
	flex-direction: row;
	justify-content: flex-end;
`;
