import * as React from 'react';
import { ScrollView, Text, View } from 'react-native';

import { useStoreMap } from 'node_modules/effector-react';
import { useTranslation } from 'react-i18next';
import * as StoreBooks from 'stores/books';
import * as StoreUser from 'stores/user';
import styled from 'styled-components/native';
import { fonts, sizes } from 'styles/Variables';

import { Api } from 'api/apiSwagger';

import ContainerZone from 'components/ContainerZone';
import TitleContent from 'components/text/TitleContent';

import useNav from 'utils/navigation';

const api = new Api();

const AdminBook = () => {
	const navigation = useNav();
	const { t } = useTranslation();
	const [edit, setEdit] = React.useState(false);
	const [signup, setSignup] = React.useState(false);

	const storeBooks = useStoreMap(StoreBooks.store, (store) => store);
	const storeUser = useStoreMap(StoreUser.store, (store) => store);
	const user = storeUser.id;

	return (
		<ContainerZone>
			<TitleContent label={t('admin:books')} />
		</ContainerZone>
	);
};

export default AdminBook;

const ScrollViewContent = styled(ScrollView)`
	flex: 1;
`;
const TextContent = styled(Text)`
	font: ${fonts.content};
`;
const ViewRow = styled(View)`
	flex-direction: row;
	justify-content: center;
	align-items: center;
	gap: ${sizes.padding.main}px;
	padding: ${sizes.padding.main}px;
`;
const ViewList = styled(View)`
	gap: ${sizes.padding.main}px;
`;
