import * as React from 'react';
import { TextInput, TextInputProps, View } from 'react-native';

import { useTranslation } from 'react-i18next';
import { styled } from 'styled-components/native';
import * as styles from 'styles/Styles';
import { colors, fonts, sizes } from 'styles/Variables';

interface Props extends TextInputProps {
	borderColor?: string;
}

const InputContent: React.FC<TextInputProps> = ({ borderColor, ...props }: Props) => {
	const { t } = useTranslation();

	return <InputContentStyle {...props} />;
};
export default InputContent;

const ViewSearchBar = styled(View)`
	${styles.PrimaryContainer}
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	max-width: ${sizes.width.max}px;
`;
const InputContentStyle = styled(TextInput)`
	border-bottom-color: ${(props) =>
		props.style?.borderColor ? props.style?.borderColor : colors.primary};
	border-bottom-width: 2px;

	font: ${fonts.content};

	height: ${sizes.text.input}px;
	width: ${sizes.width.input}px;
	margin: 0 ${sizes.padding.main}px;

	align-self: center;
`;
