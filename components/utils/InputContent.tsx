import * as React from 'react';
import { TextInput, TextInputProps, View } from 'react-native';

import { useTranslation } from 'react-i18next';
import { styled } from 'styled-components/native';
import * as styles from 'styles/Styles';
import { colors, fonts, sizes } from 'styles/Variables';

interface Props extends TextInputProps {
	inputError?: boolean;
}

const InputContent = ({ inputError = false, ...props }: Props) => {
	const { t } = useTranslation();

	return <InputContentStyle {...props} inputError={inputError} />;
};
export default InputContent;

const ViewSearchBar = styled(View)`
	${styles.PrimaryContainer}
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	max-width: ${sizes.width.max}px;
`;
const InputContentStyle = styled(TextInput)<{ inputError?: boolean }>`
	border-bottom-color: ${(props) => (props.inputError ? colors.danger : colors.primary)};
	border-bottom-width: 2px;

	font: ${fonts.content};

	height: ${sizes.text.input}px;
	width: ${sizes.width.input}px;
	margin: 0 ${sizes.padding.main}px;

	align-self: center;
`;
