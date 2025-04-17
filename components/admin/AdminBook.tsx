import * as React from 'react';
import { Text, View } from 'react-native';

import { IconNames } from 'assets/icons/Icons';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/native';
import { colors, fonts, sizes } from 'styles/Variables';

import ContainerZone from 'components/ContainerZone';
import AddBook from 'components/admin/AddBook';
import Button from 'components/button/Button';
import TitleContent from 'components/text/TitleContent';

import useNav from 'utils/navigation';
import RouteNames from 'utils/routes';

const AdminBook = () => {
	const { t } = useTranslation();
	const navigation = useNav();

	const [addBook, setAddBook] = React.useState(true);

	return (
		<>
			<Button
				label={t('admin:add')}
				iconName={IconNames.bookmark}
				onPress={() => setAddBook(!addBook)}
				background={colors.secondary}
			/>
			{addBook && (
				<ContainerZone>
					<AddBook setAddBook={setAddBook} />
				</ContainerZone>
			)}
			<TitleContent label={t('admin:books')} />
			<TextContent>{t('admin:goBackOnCatalogToDeleteBooks')}</TextContent>
			<Button
				label={t('home:explore')}
				iconName={IconNames.book}
				onPress={() => {
					navigation.navigate(RouteNames.CatalogNavigator, {
						screen: RouteNames.Catalog,
					} as any);
				}}
				background={colors.primary}
			/>
		</>
	);
};

export default AdminBook;

const TextContent = styled(Text)`
	font: ${fonts.content};
`;
const ViewList = styled(View)`
	gap: ${sizes.padding.main}px;
`;
