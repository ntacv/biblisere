import { View } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

import Header from 'components/header/Header';

const ViewPage = (props) => {
	const insets = useSafeAreaInsets();

	return (
		<Container {...props} insets={insets}>
			{props?.header && <Header />}

			{props.children}
		</Container>
	);
};
export default ViewPage;

const Container = styled(View)`
	flex: 1;
	padding-top: ${(props) => props.insets.top}px;
	padding-bottom: ${(props) => props.insets.bottom}px;
	padding-left: ${(props) => props.insets.left}px;
	padding-right: ${(props) => props.insets.right}px;
`;
