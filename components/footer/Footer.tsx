import * as React from 'react';
import { Text, View } from 'react-native';

import { useStoreMap } from 'effector-react';
import { useTranslation } from 'react-i18next';
import * as StoreHealth from 'stores/health';
import { styled } from 'styled-components/native';
import { colors } from 'styles/Variables';

import { getApiHealth } from 'api/apiCalls';

const Footer = () => {
	const { t } = useTranslation();

	const status = useStoreMap(StoreHealth.store, (store) => store.status?.status);

	React.useEffect(() => {
		getApiHealth().then((response) => {
			StoreHealth.actions.setHealth(response);
		});
	}, []);

	return (
		<ViewFooter>
			<Text>{t('footer:contact')}</Text>
			<Text>{t('footer:privacy')}</Text>
			<Text>{t('footer:terms')}</Text>
			<Text>{t('config:status')}</Text>
			<Text>{status ? status : t('config:loading')}</Text>
		</ViewFooter>
	);
};
export default Footer;

const ViewFooter = styled(View)`
	background: ${colors.footer};
	display: flex;
`;
