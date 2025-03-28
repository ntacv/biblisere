import * as React from 'react';
import { View } from 'react-native';

import { styled } from 'styled-components/native';
import { sizes } from 'styles/Variables';

const ContainerColumn = (props) => {
	return <ContentColumn {...props}>{props.children}</ContentColumn>;
};
export default ContainerColumn;

const ContentColumn = styled(View)`
	margin: 0 ${sizes.padding.main}px;
	gap: ${sizes.padding.main}px;
`;
