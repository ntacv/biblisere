import * as React from 'react';
import { TouchableOpacity, View } from 'react-native';

import Icon, { IconNames } from 'assets/icons/Icons';
import { useTranslation } from 'react-i18next';
import { styled } from 'styled-components/native';
import * as styles from 'styles/Styles';
import { sizes } from 'styles/Variables';

import Button from 'components/button/Button';
import InputContent from 'components/utils/InputContent';

interface Props {
	onPress?: () => void;
	value?: { search: string; setSearch: (search: string) => void };
	home?: boolean;
}

const Searchbar = ({ onPress, value, home }: Props) => {
	const { t } = useTranslation();

	return (
		<ViewSearchBar>
			<InputContent
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
