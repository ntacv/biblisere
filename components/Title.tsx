import React from "react";
import { Text, View } from "react-native";
import styled from "styled-components";
import { colors, fonts } from "styles/Variables";
import * as styles from "styles/Styles";

const Title = ({ children }) => {
  return (
    <ViewTitle>
      <TextTitle>{children}</TextTitle>
    </ViewTitle>
  );
};
export default Title;

const TextTitle = styled(Text)`
  ${styles.fontTitle}
  text-align: center;
`;
const ViewTitle = styled(View)`
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
