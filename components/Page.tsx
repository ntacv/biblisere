import { View } from "react-native";
import styled from "styled-components/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Page = ({ children }) => {
  const insets = useSafeAreaInsets();

  return <ViewPage insets={insets}>{children}</ViewPage>;
};
export default Page;

const ViewPage = styled(View)`
  padding-top: ${(props) => props.insets.top}px;
  padding-bottom: ${(props) => props.insets.bottom}px;
  padding-left: ${(props) => props.insets.left}px;
  padding-right: ${(props) => props.insets.right}px;
  background-color: "red";
`;
