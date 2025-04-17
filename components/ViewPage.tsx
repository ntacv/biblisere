import { View } from 'react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import { sizes } from 'styles/Variables';

import Header from 'components/header/Header';

interface Props {
	children: React.ReactNode;
	header?: boolean;
	returnIcon?: boolean;
}

const ViewPage = ({ children, header, returnIcon }: Props) => {
	const insets = useSafeAreaInsets();

	return (
		<Container insets={insets}>
			{header && <Header returnIcon={returnIcon} />}

			{children}
		</Container>
	);
};
export default ViewPage;

const Container = styled(View)`
	flex: 1;
	padding-top: ${(props) => props.insets.top}px;
	padding-bottom: ${(props) => props.insets.bottom + sizes.padding.main}px;
	padding-left: ${(props) => props.insets.left}px;
	padding-right: ${(props) => props.insets.right}px;
`;
