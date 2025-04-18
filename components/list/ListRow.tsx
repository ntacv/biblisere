import * as React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { IconNames } from 'assets/icons/Icons';
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
		<ViewContainer>
			{title && (
				<TouchableOpacity activeOpacity={0.8} onPress={onPressTitle}>
					<TitleContent iconEnd={onPressTitle && IconNames.arrowRight} label={title} />
				</TouchableOpacity>
			)}
			{booksId && (
				<ViewNewBooks horizontal>
					{booksId.map((bookId, index) => {
						const book = books?.bookMap[bookId];
						return (
							<TouchableBook
								key={index}
								activeOpacity={0.8}
								onPress={() => {
									navigation.navigate(RouteNames.CatalogNavigator, {
										screen: RouteNames.Details,
										params: { bookId: book?.id } as any,
									} as any);
								}}
							>
								<ImageBook source={{ uri: book?.imageUrl }} />
								<TextContentDate>
									{t('dates:month-year', { val: new Date(book?.publicationDate) })}
								</TextContentDate>
							</TouchableBook>
						);
					})}
				</ViewNewBooks>
			)}
		</ViewContainer>
	);
};
export default ListRow;

const ViewContainer = styled(View)`
	gap: ${sizes.padding.main}px;
`;
const ViewNewBooks = styled(ScrollView)`
	height: ${sizes.height.imageList + 30}px;
`;
const TouchableBook = styled(TouchableOpacity)`
	margin-right: ${sizes.padding.main}px;
	gap: 5px;
`;
const TextContent = styled(Text)`
	font: ${fonts.content};
`;
const TextContentDate = styled(Text)`
	font: ${fonts.content};
	text-align: center;
	font-weight: bold;
`;
