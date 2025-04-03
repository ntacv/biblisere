import { Text, TouchableOpacity } from 'react-native';

import Icon, { iconType } from 'assets/icons/Icons';
import styled from 'styled-components';
import { colors, sizes } from 'styles/Variables';

interface Props {
	onPress?: () => void;
	label?: string;
	iconName?: iconType;
	background?: string;
	alignLeft?: boolean;
}

const Button = ({ onPress, label, iconName, background, alignLeft }: Props) => {
	return (
		<Container onPress={onPress} background={background} alignLeft={alignLeft} activeOpacity={0.8}>
			{iconName && (
				<Icon
					iconName={iconName}
					width={sizes.icons.search}
					height={sizes.icons.search}
					stroke={colors.content}
				/>
			)}
			{label && <TextInside>{label}</TextInside>}
		</Container>
	);
};
export default Button;

const TextInside = styled(Text)`
	font-size: ${sizes.text.content}px;
	text-align: center;
`;

const Container = styled(TouchableOpacity)<{ background?: string; alignLeft?: boolean }>`
	background-color: ${(props) => (props.background ? props.background : colors.primary)};
	padding: 8px 15px;
	border-radius: ${sizes.radius.in};
	flex-direction: row;
	gap: ${sizes.padding.main}px;
	align-self: ${(props) => (props.alignLeft ? 'flex-end' : 'center')};
`;
