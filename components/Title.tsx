import { Text, View } from "react-native";
import styled from "styled-components";
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
  ${styles.textOneLine}
  text-align: center;
`;
const ViewTitle = styled(View)`
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
