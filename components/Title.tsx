import React from "react";
import { Text, View } from "react-native";
import styled from "styled-components";

const TextTitle = styled(Text)`
  font-size: 30px;
  font-weight: bold;
  text-align: center;
`;
const ViewTitle = styled(View)`
  background: red;
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const Title = ({ children }) => {
  return (
    <ViewTitle>
      <Text>Logo</Text>
      <TextTitle>{children}</TextTitle>
    </ViewTitle>
  );
};
export default Title;
