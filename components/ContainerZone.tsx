import { View, ViewProps } from 'react-native';

import { styled } from 'styled-components/native';
import { colors, sizes } from 'styles/Variables';

const ContainerZone: React.FC<ViewProps> = (props) => {
	return <Container {...props}>{props.children}</Container>;
};
export default ContainerZone;

const Container = styled(View)`
	background-color: ${colors.secondary};
	padding: ${sizes.padding.main}px;
	border-radius: ${sizes.radius.out};
`;
