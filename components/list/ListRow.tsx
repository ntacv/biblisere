import * as React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { useStoreMap } from 'node_modules/effector-react';
import { useTranslation } from 'react-i18next';
import * as StoreBooks from 'stores/books';
import styled from 'styled-components/native';
import { fonts, sizes } from 'styles/Variables';

import { Api } from 'api/apiSwagger';

import ImageBook from 'components/image/ImageBook';
import TitleContent from 'components/text/TitleContent';

import useNav from 'utils/navigation';
import RouteNames from 'utils/routes';

const api = new Api();

interface Props {
	title?: string;
	booksId?: number[];
	onPressTitle?: () => void;
}

const ListRow = ({ title, booksId, onPressTitle }: Props) => {
	const navigation = useNav();
	const { t } = useTranslation();

	const books = useStoreMap(StoreBooks.store, (store) => store);

	return (
		<View>
			{title && (
				<TouchableOpacity activeOpacity={0.8} onPress={onPressTitle}>
					<TitleContent iconEnd={onPressTitle && 'arrowRight'} label={title} />
				</TouchableOpacity>
			)}
			{!booksId ? null : (
				<ViewNewBooks horizontal>
					{books.books?.map((book, index) => (
						<TouchableOpacity
							key={index}
							activeOpacity={0.8}
							onPress={() =>
								navigation.navigate(RouteNames.CatalogNavigator, {
									screen: RouteNames.Details,
									params: { bookId: book.id } as any,
								} as any)
							}
						>
							<ImageBook source={{ uri: book.imageUrl }} />
							<TextContentDate>
								{t('dates:month-year', { val: new Date(book.publicationDate) })}
							</TextContentDate>
						</TouchableOpacity>
					))}
				</ViewNewBooks>
			)}
		</View>
	);
};
export default ListRow;

const ViewNewBooks = styled(ScrollView)`
	height: ${sizes.height.imageList + 30}px;
`;
const TextContent = styled(Text)`
	font: ${fonts.content};
`;
const TextContentDate = styled(Text)`
	font: ${fonts.content};
	text-align: center;
	font-weight: bold;
`;
