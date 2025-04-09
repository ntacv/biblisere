import * as React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { useTranslation } from 'react-i18next';
import * as StoreBooks from 'stores/books';
import * as StoreUser from 'stores/user';
import { styled } from 'styled-components/native';
import { fonts, sizes } from 'styles/Variables';
import { RouteNames } from 'types';

import ContainerZone from 'components/ContainerZone';
import BorrowBook from 'components/book/BorrowBook';
import ImageBook from 'components/image/ImageBook';

import { useNav } from 'utils/navigation';

export interface Props {
	bookId: number;
}

const BookListItem = ({ bookId }: Props) => {
	const { t } = useTranslation();
	const navigation = useNav();

	const storeUser = StoreUser.store.getState();
	const book = StoreBooks.store.getState().books.find((book) => book.id === bookId);

	return (
		<TouchableOpacity
			onPress={() =>
				navigation.navigate(RouteNames.Catalog, {
					screen: RouteNames.Details,
					params: { bookId: book.id } as any,
				} as any)
			}
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
						{storeUser.id?.canBorrow && <BorrowBook bookId={book.id} />}
					</ViewSide>
				</ViewListItem>
			</ContainerZone>
		</TouchableOpacity>
	);
};
export default BookListItem;

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
