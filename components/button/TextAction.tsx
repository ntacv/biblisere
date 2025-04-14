import { Text, TouchableOpacity } from 'react-native';

import { styled } from 'styled-components/native';
import { colors, fonts } from 'styles/Variables';

interface Props {
	label: string;
	onPress: () => void;
}

const TextAction = ({ label, onPress }: Props) => {
	return (
		<TouchableOpacity onPress={onPress} activeOpacity={0.8}>
			<TextContent>{label}</TextContent>
		</TouchableOpacity>
	);
};
export default TextAction;

const TextContent = styled(Text)`
	font: ${fonts.content};
	color: ${colors.content};
	text-decoration: underline solid ${colors.content};
	text-align: center;
`;
