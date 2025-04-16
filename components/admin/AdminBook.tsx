import * as React from 'react';
import { Text, View } from 'react-native';

import { IconNames } from 'assets/icons/Icons';
import { useStoreMap } from 'node_modules/effector-react';
import { useTranslation } from 'react-i18next';
import * as StoreBooks from 'stores/books';
import * as StoreUser from 'stores/user';
import styled from 'styled-components/native';
import { colors, fonts, sizes } from 'styles/Variables';

import { Api } from 'api/apiSwagger';

import ContainerZone from 'components/ContainerZone';
import AddBook from 'components/admin/AddBook';
import Button from 'components/button/Button';
import TitleContent from 'components/text/TitleContent';

const api = new Api();

const AdminBook = () => {
	const { t } = useTranslation();
	const [addBook, setAddBook] = React.useState(true);

	const storeBooks = useStoreMap(StoreBooks.store, (store) => store);
	const storeUser = useStoreMap(StoreUser.store, (store) => store);

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
