import React from 'react';
import { View } from 'react-native';

import i18next, { languages } from 'localization/i18n';
import { useTranslation } from 'react-i18next';
import { styled } from 'styled-components/native';
import { colors, sizes } from 'styles/Variables';

import Button from 'components/button/Button';

const ChooseLanguage = () => {
	const { t } = useTranslation();

	return (
		<Container>
			{languages.map((language) => (
				<Button
					key={language}
					label={t('components:translate:' + language)}
					background={i18next.language !== language ? colors.primary : colors.clickable}
					onPress={() => i18next.changeLanguage(language)}
				/>
			))}
		</Container>
	);
};
export default ChooseLanguage;

const Container = styled(View)`
	display: flex;
	flex-direction: row;
	gap: ${sizes.padding.main}px;
`;
