import { View } from "react-native";
import styled from "styled-components/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ViewPage = ({ children }) => {
  const insets = useSafeAreaInsets();

  return <Container insets={insets}>{children}</Container>;
};
export default ViewPage;

const Container = styled(View)`
  flex: 1;
  padding-top: ${(props) => props.insets.top}px;
  padding-bottom: ${(props) => props.insets.bottom}px;
  padding-left: ${(props) => props.insets.left}px;
  padding-right: ${(props) => props.insets.right}px;
`;
