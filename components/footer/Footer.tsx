import * as React from 'react';
import { View } from 'react-native';

import { useStoreMap } from 'effector-react';
import { useTranslation } from 'react-i18next';
import * as StoreHealth from 'stores/health';
import { styled } from 'styled-components/native';
import { colors, sizes } from 'styles/Variables';

import { Api } from 'api/apiSwagger';

import TextLink from 'components/button/TextLink';

const api = new Api();

const Footer = () => {
	const { t } = useTranslation();

	const status = useStoreMap(StoreHealth.store, (store) => store.status?.status);

	React.useEffect(() => {
		api.health.healthControllerCheck().then((response) => {
			StoreHealth.actions.setHealth(response);
		});
	}, []);

	return (
		<ViewFooter>
			<TextLink url="https://www.cardiweb.com/contact">{t('footer:contact')}</TextLink>

			<TextLink url="https://www.cardiweb.com/mentions-legales">{t('footer:terms')}</TextLink>

			<TextLink url="https://www.cardiweb.com/mentions-legales">{t('footer:privacy')}</TextLink>
		</ViewFooter>
	);
};
export default Footer;

const ViewFooter = styled(View)`
	background: ${colors.footer};
	display: grid;
	align-items: center;
	padding: ${sizes.padding.main}px 0;
	margin-top: ${sizes.padding.bottom}px;
`;
