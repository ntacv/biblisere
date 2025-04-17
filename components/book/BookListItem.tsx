import * as React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { useStoreMap } from 'node_modules/effector-react';
import { useTranslation } from 'react-i18next';
import * as StoreBooks from 'stores/books';
import * as StoreUser from 'stores/user';
import { styled } from 'styled-components/native';
import { fonts, sizes } from 'styles/Variables';

import ContainerZone from 'components/ContainerZone';
import BorrowBook from 'components/book/BorrowBook';
import ImageBook from 'components/image/ImageBook';

import useNav from 'utils/navigation';
import RouteNames from 'utils/routes';

export interface Props {
	bookId: number;
}

const BookListItem = ({ bookId }: Props) => {
	const { t } = useTranslation();
	const navigation = useNav();

	const storeUser = StoreUser.store.getState();
	const book = useStoreMap(StoreBooks.store, (store) => store).books?.find(
		(book) => book.id === bookId,
	);

	return (
		<TouchableOpacity
			activeOpacity={0.8}
			onPress={() =>
				navigation.navigate(RouteNames.CatalogNavigator, {
					screen: RouteNames.Details,
					params: { bookId: book.id } as any,
				} as any)
			}
		>
			<ContainerZone>
				<ViewListItem>
					<ImageBook width={sizes.height.imageItem} source={{ uri: book.imageUrl }} />
					<ViewSide>
						<TextBold>{book.title}</TextBold>
						<TextContent>{book.author}</TextContent>
						<TextContent>
							{t('dates:month-year-long', { val: new Date(book.publicationDate) })}
						</TextContent>

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
	padding-left: ${sizes.padding.main}px;
`;
const ViewSide = styled(View)`
	flex: 1;
`;

const TextContent = styled(Text)`
	font: ${fonts.content};
`;
const TextBold = styled(Text)`
	font: ${fonts.content};
	font-weight: bold;
`;
