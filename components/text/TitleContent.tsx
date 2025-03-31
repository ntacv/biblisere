import { Text, View } from 'react-native';

import Icon from 'assets/icons/Icons';
import styled from 'styled-components';
import * as styles from 'styles/Styles';
import { colors, sizes } from 'styles/Variables';

const Title = (props) => {
	return (
		<ViewTitle>
			{props.iconStart && (
				<Icon
					iconName={props.iconStart}
					width={sizes.icons.content}
					height={sizes.icons.content}
					stroke={colors.content}
				/>
			)}
			<TextTitle>{props.label}</TextTitle>
			{props.iconEnd && (
				<Icon
					iconName={props.iconEnd}
					width={sizes.icons.content}
					height={sizes.icons.content}
					stroke={colors.content}
				/>
			)}
		</ViewTitle>
	);
};
export default Title;

const TextTitle = styled(Text)`
	${styles.textOneLine}
	font-size: ${sizes.text.title}px;
	font-weight: 700;
`;
const ViewTitle = styled(View)`
	flex-direction: row;
	align-items: center;
	gap: ${sizes.padding.icon}px;
`;
