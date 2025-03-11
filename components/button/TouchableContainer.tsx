import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components";

const TextInside = styled(Text)`
  font-size: 20px;
  text-align: center;
`;
const ViewInside = styled(View)`
  background: lightblue;
`;

const TouchableContainer = ({ children, route }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity>
      <ViewInside>
        <TextInside>{children}</TextInside>
      </ViewInside>
    </TouchableOpacity>
  );
};
export default TouchableContainer;
