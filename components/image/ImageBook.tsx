import * as React from 'react';
import { Image, ImageProps } from 'react-native';

import styled from 'styled-components/native';
import { sizes } from 'styles/Variables';

interface Props extends ImageProps {
	size?: number;
}

const ImageBook: React.FC<ImageProps> = ({ size, ...props }: Props) => {
	return <ImageBookStyle {...props} />;
};
export default ImageBook;

const ImageBookStyle = styled(Image)`
	height: ${(props) => (!!props.height ? props.height : sizes.height.imageList)}px;
	width: ${(props) => (!!props.width ? props.width : sizes.height.imageList)}px;
	aspect-ratio: 3/4;
	object-fit: contain;
`;
