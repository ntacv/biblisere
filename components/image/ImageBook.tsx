import * as React from 'react';
import { Image, ImageProps } from 'react-native';

import styled from 'styled-components/native';
import { sizes } from 'styles/Variables';

const ImageBook: React.FC<ImageProps> = (props) => {
	return <ImageBookStyle {...props} />;
};
export default ImageBook;

const ImageBookStyle = styled(Image)`
	height: ${sizes.height.imageList}px;
	width: ${sizes.height.imageList}px;
	background-color: 'red';
	aspect-ratio: 3/4;
	object-fit: contain;
`;
