import * as React from 'react';
import { Text } from 'react-native';

import { IconNames } from 'assets/icons/Icons';
import { useStoreMap } from 'effector-react';
import { useTranslation } from 'react-i18next';
import * as StoreBooks from 'stores/books';
import * as StoreUser from 'stores/user';
import { styled } from 'styled-components/native';
import { fonts, sizes } from 'styles/Variables';

import { MAX_BOOKS, Role, bookStore } from 'api/apiSwagger';

import Button from 'components/button/Button';
import renderAlert from 'components/utils/renderAlert';

import useNav from 'utils/navigation';
import RouteNames from 'utils/routes';

export interface Props {
	bookId: number;
}

const BorrowBook = ({ bookId }: Props) => {
	const { t } = useTranslation();
	const navigation = useNav();

	const user = useStoreMap(StoreUser.store, (store) => store).id;
	const book = useStoreMap(StoreBooks.store, (store) => store).books.find(
		(book) => book.id === bookId,
	);

	const borrowBook = (bookId: number) => {
		// check if user has reached the limit of borrowed books
		if (user.books.length >= MAX_BOOKS) {
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
				{book?.quantity > 0
					? t('catalog:available', { val: book.quantity })
					: t('catalog:unavailable')}
			</TextContent>

			<ViewRow>
				{user.role === Role.admin && (
					<Button
						iconName={IconNames.trash}
						onPress={() => {
							renderAlert(t('catalog:delete'), t('catalog:deleteBookConfirm'), t('user:cancel'), {
								text: t('catalog:delete'),
								onPress: () => {
									bookStore.deleteBook(bookId);
									navigation.navigate(RouteNames.CatalogNavigator, {
										screen: RouteNames.Catalog,
									} as any);
								},
							});
						}}
						alignLeft
						active
					/>
				)}

				{user?.books.map((self) => self.id).includes(bookId) ? (
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
			</ViewRow>
		</>
	);
};
export default BorrowBook;

const TextContent = styled(Text)`
	font: ${fonts.content};
	flex: 1;
`;
const ViewRow = styled.View`
	flex-direction: row;
	justify-content: flex-end;
	gap: ${sizes.padding.main}px;
`;
