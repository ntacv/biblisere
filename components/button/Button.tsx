import React from "react";
import { Text, TouchableOpacity } from "react-native";
import styled from "styled-components";

import { useNav } from "utils/navigation";
import { colors, sizes } from "styles/Variables";

const Button = ({ children, onPress = undefined, ...props }) => {
  const navigation = useNav();

  return (
    <TouchableButton onPress={onPress} background={props.options?.background}>
      <TextInside>{children}</TextInside>
    </TouchableButton>
  );
};
export default Button;

const TextInside = styled(Text)`
  font-size: 20px;
  text-align: center;
`;

const TouchableButton = styled(TouchableOpacity)<{ background?: string }>`
  background-color: ${(props) =>
    props.background ? props.background : colors.primary};
  padding: 8px 15px;
  border-radius: ${sizes.radius.in};
`;
