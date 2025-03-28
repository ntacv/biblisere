import { Linking, Text, TouchableOpacity } from 'react-native';

import { styled } from 'styled-components/native';
import { colors, fonts } from 'styles/Variables';

interface Props {
	children: JSX.Element | string;
	url: string;
}

const TextLink = (props: Props) => {
	return (
		<TouchableOpacity {...props} onPress={() => Linking.openURL(props.url)} activeOpacity={0.8}>
			<TextContent>{props.children}</TextContent>
		</TouchableOpacity>
	);
};
export default TextLink;

const TextContent = styled(Text)`
	font: ${fonts.content};
	color: ${colors.content};
	text-decoration: underline solid ${colors.content};
`;
