import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import styled from "styled-components";

import { StackParamList } from "types";
import { colors } from "styles/Variables";

const TextInside = styled(Text)`
  font-size: 20px;
  text-align: center;
`;
const ViewInside = styled(View)`
  background: ${colors.secondary};
`;

const TouchableContainer = ({ children, route = undefined }) => {
  const navigation = useNavigation<NavigationProp<StackParamList>>();

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate(route !== undefined ? route : "Homepage")
      }
    >
      <ViewInside>
        <TextInside>{children}</TextInside>
      </ViewInside>
    </TouchableOpacity>
  );
};
export default TouchableContainer;
