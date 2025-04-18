import * as React from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';

import Icon, { IconNames } from 'assets/icons/Icons';
import { useTranslation } from 'react-i18next';
import { styled } from 'styled-components/native';
import * as styles from 'styles/Styles';
import { colors, fonts, sizes } from 'styles/Variables';

import Button from 'components/button/Button';

interface Props {
	onPress?: () => void;
	value?: { search: string; setSearch: (search: string) => void };
	home?: boolean;
}

const Searchbar = ({ onPress, value, home }: Props) => {
	const { t } = useTranslation();

	return (
		<ViewSearchBar>
			<InputSearch
				placeholder={t('components:input:placeholder')}
				maxLength={sizes.text.length}
				onChangeText={(text) => {
					value?.setSearch(text);
				}}
				value={value?.search}
			/>
			{!home && (
				<TouchableOpacity activeOpacity={0.5} onPress={() => value?.setSearch('')}>
					<Icon iconName={IconNames.x} width={sizes.icons.content} />
				</TouchableOpacity>
			)}
			<Button
				iconName={IconNames.search}
				alignLeft
				onPress={onPress}
				label={home ? t('catalog:books') : null}
				active
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
	gap: ${sizes.padding.main}px;
	padding-left: ${sizes.padding.in}px;
`;
const InputSearch = styled(TextInput)`
	border-bottom-color: ${colors.primary};
	border-bottom-width: 2px;

	font: ${fonts.content};

	align-self: center;
	padding-bottom: ${sizes.padding.main - 5}px;
	width: ${sizes.width.input}px;
	flex: 1;
`;
