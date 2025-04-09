import { Text, TouchableOpacity } from 'react-native';

import { styled } from 'styled-components/native';
import { colors, fonts } from 'styles/Variables';

interface Props {
	children: string;
	onPress?: () => void;
}

const TextLink = ({ children, onPress }: Props) => {
	return (
		<TouchableOpacity onPress={onPress} activeOpacity={0.8}>
			<TextContent>{children}</TextContent>
		</TouchableOpacity>
	);
};
export default TextLink;

const TextContent = styled(Text)`
	font: ${fonts.content};
	color: ${colors.content};
	text-decoration: underline solid ${colors.content};
`;
