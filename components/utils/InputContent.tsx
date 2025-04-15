import * as React from 'react';
import { TextInput, TextInputProps } from 'react-native';

import { styled } from 'styled-components/native';
import { colors, fonts, sizes } from 'styles/Variables';

interface Props extends TextInputProps {
	inputError?: boolean;
}

const InputContent = ({ inputError = false, ...props }: Props) => {
	return <InputContentStyle {...props} inputError={inputError} />;
};
export default InputContent;

const InputContentStyle = styled(TextInput)`
	border-bottom-color: ${(props) => (props.inputError ? colors.danger : colors.primary)};
	border-bottom-width: 2px;

	font: ${fonts.content};

	align-self: center;
	height: ${sizes.text.input}px;
	width: ${sizes.width.input}px;
`;
