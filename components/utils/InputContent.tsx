import * as React from 'react';
import { TextInput, TextInputProps } from 'react-native';

import { useTranslation } from 'react-i18next';
import { styled } from 'styled-components/native';
import { colors, fonts, sizes } from 'styles/Variables';

interface Props extends TextInputProps {
	inputError?: boolean;
}

const InputContent = ({ inputError = false, ...props }: Props) => {
	const { t } = useTranslation();

	return <InputContentStyle {...props} inputError={inputError} />;
};
export default InputContent;

const InputContentStyle = styled(TextInput)<{ inputError?: boolean }>`
	border-bottom-color: ${(props) => (props.inputError ? colors.danger : colors.primary)};
	border-bottom-width: 2px;

	font: ${fonts.content};

	height: ${sizes.text.input}px;
	flex: 1;

	align-self: center;
`;
