import * as React from 'react';
import { View } from 'react-native';

import { useTranslation } from 'react-i18next';
import { styled } from 'styled-components/native';
import * as styles from 'styles/Styles';
import { sizes } from 'styles/Variables';

import Button from 'components/button/Button';
import InputContent from 'components/utils/InputContent';

const Searchbar = (props) => {
	const { t } = useTranslation();

	return (
		<ViewSearchBar {...props}>
			<InputContent placeholder={t('components:input:placeholder')} />

			<Button
				label="Search"
				iconName="search"
				onPress={() => alert(t('components:button:click'))}
			/>
		</ViewSearchBar>
	);
};
export default Searchbar;

const ViewSearchBar = styled(View)`
	${styles.PrimaryContainer}
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	max-width: ${sizes.width.max}px;
`;
