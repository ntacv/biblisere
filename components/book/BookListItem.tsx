import * as React from 'react';
import { Text, View } from 'react-native';

import { IconNames } from 'assets/icons/Icons';
import { useTranslation } from 'react-i18next';
import { styled } from 'styled-components/native';
import { fonts, sizes } from 'styles/Variables';

import { Book } from 'api/apiSwagger';

import ContainerZone from 'components/ContainerZone';
import Button from 'components/button/Button';
import ImageBook from 'components/image/ImageBook';

export interface ItemProps {
	book: Book;
}

const BookListItem = ({ book }: ItemProps) => {
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
					{book.quantity > 0 ? (
						<Button label={t('catalog:add')} iconName={IconNames.bookmark} alignLeft />
					) : (
						<Button label={t('catalog:remove')} iconName={IconNames.x} alignLeft />
					)}
				</ViewSide>
			</ViewListItem>
		</ContainerZone>
	);
};
export default BookListItem;

const ViewListItem = styled(View)`
	flex-direction: row;
	padding-left: ${sizes.padding.main}px;
`;
const ViewSide = styled(View)`
	flex: 1;
	justify-content: space-between;
	padding: 0 0 0 ${sizes.padding.main}px;
`;

const TextContent = styled(Text)`
	font: ${fonts.content};
`;
const TextBold = styled(Text)`
	font: ${fonts.content};
	font-weight: bold;
`;
