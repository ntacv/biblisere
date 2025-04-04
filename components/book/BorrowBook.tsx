import * as React from 'react';
import { View } from 'react-native';

import { useStoreMap } from 'effector-react';
import { useTranslation } from 'react-i18next';
import * as StoreUser from 'stores/user';
import { styled } from 'styled-components/native';

import { Api, Book, MAX_BOOKS, bookStore } from 'api/apiSwagger';

import Button from 'components/button/Button';

const api = new Api();

export interface ItemProps {
	bookProp: Book;
}

const BorrowBook = (props: ItemProps) => {
	const book = props.bookProp;

	const { t } = useTranslation();

	const storeUser = useStoreMap(StoreUser.store, (store) => store);

	const returnBook = (book: Book) => {
		bookStore.return(book.id);
	};

	const borrowBook = (book: Book) => {
		const token = StoreUser.store.getState().token;

		// check if user has reached the limit of borrowed books
		if (storeUser.id?.books?.length >= MAX_BOOKS) {
			alert(t('catalog:limitBooks', { val: MAX_BOOKS }));
			return;
		}
		// else borrow a book and update user and catalog data
		bookStore.borrow(book.id);
	};

	return (
		<ViewButton>
			{book.quantity > 0 ? (
				<Button label={t('catalog:add')} iconName="bookmark" onPress={() => borrowBook(book)} />
			) : (
				<Button label={t('catalog:remove')} iconName="x" onPress={() => returnBook(book)} />
			)}
		</ViewButton>
	);
};
export default BorrowBook;

const ViewButton = styled(View)`
	flex-direction: row;
	justify-content: flex-end;
`;
