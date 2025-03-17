import React from "react";
import { Text, View } from "react-native";
import styled from "styled-components";
import { colors } from "styles/Variables";

const Title = ({ children }) => {
  return (
    <ViewTitle>
      <TextTitle>{children}</TextTitle>
    </ViewTitle>
  );
};
export default Title;

const TextTitle = styled(Text)`
  color: ${colors.primary};
  font-size: 30px;
  font-weight: bold;
  text-align: center;
`;
const ViewTitle = styled(View)`
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
