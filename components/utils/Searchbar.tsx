import * as React from 'react';
import { TextInput, View } from 'react-native';

import { IconNames } from 'assets/icons/Icons';
import { useTranslation } from 'react-i18next';
import { styled } from 'styled-components/native';
import * as styles from 'styles/Styles';
import { colors, fonts, sizes } from 'styles/Variables';

import Button from 'components/button/Button';

const Searchbar = (props) => {
	const { t } = useTranslation();

	return (
		<ViewSearchBar {...props}>
			<InputContent placeholder={t('components:input:placeholder')} maxLength={sizes.text.length} />

			<Button
				label="Search"
				iconName={IconNames.search}
				alignLeft
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
	max-width: 400px;
`;
const InputContent = styled(TextInput)`
	border-bottom-color: ${colors.primary};
	border-bottom-width: 2px;
	font: ${fonts.content};
	height: ${sizes.text.input}px;
	flex: 1;
	margin: 0 ${sizes.padding.main}px;
`;
