import React from 'react';
import { Text, View } from 'react-native';

import { useStoreMap } from 'effector-react';
import { useTranslation } from 'react-i18next';
import * as StoreBooks from 'stores/books';
import * as StoreUser from 'stores/user';
import styled from 'styled-components/native';
import { fonts, sizes } from 'styles/Variables';

import { MAX_BOOKS } from 'api/apiSwagger';

import ContainerZone from 'components/ContainerZone';
import BookListItem from 'components/book/BookListItem';
import TitleContent from 'components/text/TitleContent';

const UserStorePrint = () => {
	const { t } = useTranslation();

	const storeBooks = useStoreMap(StoreBooks.store, (store) => store);
	const storeUser = useStoreMap(StoreUser.store, (store) => store);
	const user = storeUser.id;

	return (
		<View>
			<ContainerZone>
				<TitleContent
					label={user ? user.firstName + ' ' + user.lastName : t('errors:notConnected')}
				/>
				<TextContent>{user.email}</TextContent>
				<TextContent>
					{!storeUser.id?.canBorrow ? (
						<Text>{t('user:cantBorrow')}</Text>
					) : (
						<>
							<Text>
								{t('user:borrowed', {
									val: storeUser.id?.books.length.toString(),
									max: MAX_BOOKS.toString(),
								})}
							</Text>
							<Text>{t('catalog:books') + t('config:text:colon')}</Text>
							<View>
								{storeUser.id?.books?.map((book) => (
									<Text key={book.id}>
										{book.title} - {book.author}
									</Text>
								))}
							</View>
						</>
					)}
				</TextContent>
			</ContainerZone>

			<ViewList>
				{storeBooks.books ? (
					storeBooks.books.map((book, index) => <BookListItem key={index} bookId={book.id} />)
				) : (
					<TextContent>{t('config:loading')}</TextContent>
				)}
			</ViewList>
		</View>
	);
};
export default UserStorePrint;

const TextContent = styled(Text)`
	font: ${fonts.content};
`;
const ViewList = styled(View)`
	gap: ${sizes.padding.main}px;
`;
