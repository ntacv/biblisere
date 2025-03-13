import React from "react";
import { Text, TouchableOpacity } from "react-native";
import styled from "styled-components";

import { useNav } from "utils/navigation";
import { colors } from "styles/Variables";

const Button = ({ children, onPress = undefined }) => {
  const navigation = useNav();

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
