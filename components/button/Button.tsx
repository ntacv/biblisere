import { Text, TouchableOpacity } from "react-native";
import styled from "styled-components";

import { colors, sizes } from "styles/Variables";

interface Props {
  children: JSX.Element | string;
  onPress?: () => void;
  options?: {
    background?: string;
  };
}

const Button = ({ children, onPress, options }: Props) => {
  return (
    <Container
      onPress={onPress}
      background={options?.background}
      activeOpacity={0.8}
    >
      <TextInside>{children}</TextInside>
    </Container>
  );
};
export default Button;

const TextInside = styled(Text)`
  font-size: ${sizes.text.content}px;
  text-align: center;
`;

const Container = styled(TouchableOpacity)<{ background?: string }>`
  background-color: ${(props) =>
    props.background ? props.background : colors.primary};
  padding: 8px 15px;
  border-radius: ${sizes.radius.in};
`;
