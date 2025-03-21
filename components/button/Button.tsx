import { Text, TouchableOpacity } from "react-native";
import styled from "styled-components";

import { colors } from "styles/Variables";

const Button = ({ children, onPress = undefined }) => {
  return (
    <TouchableButton onPress={onPress}>
      <TextInside>{children}</TextInside>
    </TouchableButton>
  );
};
export default Button;

const TextInside = styled(Text)`
  font-size: 20px;
  text-align: center;
`;
const TouchableButton = styled(TouchableOpacity)`
  background-color: ${colors.secondary};
`;
