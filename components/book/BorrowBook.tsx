import * as React from 'react';
import { Text } from 'react-native';

import { useTranslation } from 'react-i18next';
import * as StoreUser from 'stores/user';
import { styled } from 'styled-components/native';
import { fonts } from 'styles/Variables';

import { Api, Book, bookStore } from 'api/apiSwagger';

import Button from 'components/button/Button';

import Logger from 'utils/Logger';

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
		.catch((error) => {
			Logger.warn('Error borrowing book:', error);
		});
	api.users
		.usersControllerGetMe({
			headers: { Authorization: `Bearer ${token}` },
		})
		.then((response) => {
			StoreUser.actions.setUser(response.data);
		})
		.catch((error) => {
			Logger.warn('Error fetching user data:', error);
		});
};

const returnBook = (book: Book) => {
	bookStore.return(book.id);
};

const BorrowBook = (props: ItemProps) => {
	const book = props.bookProp;

	const { t } = useTranslation();

	return (
		<>
			<TextContent>
				{book.quantity > 0 ? t('catalog:available') : t('catalog:unavailable')}
			</TextContent>
			{book.quantity > 0 ? (
				<Button
					label={t('catalog:add')}
					iconName="bookmark"
					onPress={() => borrowBook(book)}
					align="flex-end"
				/>
			) : (
				<Button
					label={t('catalog:remove')}
					iconName="x"
					onPress={() => returnBook(book)}
					align="flex-end"
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
