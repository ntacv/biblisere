import * as React from 'react';
import { Text, View } from 'react-native';

import { useTranslation } from 'react-i18next';
import { styled } from 'styled-components/native';
import { fonts, sizes } from 'styles/Variables';

import { Book } from 'api/apiSwagger';

import ContainerZone from 'components/ContainerZone';
import Button from 'components/button/Button';
import ImageBook from 'components/image/ImageBook';

export interface Props {
	bookProp: Book;
	key: number;
}

const Content = (Props) => {
	const book = Props.bookProp;

	const { t } = useTranslation();

	return (
		<ContainerZone key={Props.key} style={{ flexDirection: 'row' }}>
			<ImageBook source={{ uri: book.imageUrl }} />
			<ViewSide>
				<TextContent>{book.title}</TextContent>
				<TextContent>{book.author}</TextContent>
				<TextContent>
					{t('dates:month-year-long', { val: new Date(book.publicationDate) })}
				</TextContent>
				{book.quantity > 0 ? (
					<Button label={t('Emprunter')} iconName="bookmark" />
				) : (
					<Button label={t('Rendre')} iconName="x" />
				)}
			</ViewSide>
		</ContainerZone>
	);
};
export default Content;

const ViewSide = styled(View)`
	flex: 1;
	padding: 0 0 0 ${sizes.padding.main}px;
`;
const TextContent = styled(Text)`
	font: ${fonts.content};
`;
const TextContentDate = styled(Text)`
	font: ${fonts.content};
	text-align: center;
	font-weight: bold;
`;
