import * as React from 'react';
import { Text, View } from 'react-native';

import { useTranslation } from 'react-i18next';
import { styled } from 'styled-components/native';
import { fonts, sizes } from 'styles/Variables';

import { Book } from 'api/apiSwagger';

import ContainerZone from 'components/ContainerZone';
import Button from 'components/button/Button';
import ImageBook from 'components/image/ImageBook';

export interface ItemProps {
	bookProp: Book;
}

const BookListItem = (props: ItemProps) => {
	const book = props.bookProp;

	const { t } = useTranslation();

	return (
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
					</View>
					<ViewButton>
						{book.quantity > 0 ? (
							<Button label={t('catalog:add')} iconName="bookmark" />
						) : (
							<Button label={t('catalog:remove')} iconName="x" />
						)}
					</ViewButton>
				</ViewSide>
			</ViewListItem>
		</ContainerZone>
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
