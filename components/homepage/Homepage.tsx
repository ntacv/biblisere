import {
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  TextInput,
  Platform,
} from "react-native";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";

/*
const Component = Platform.select({
  ios: () => require("ComponentIOS"),
  android: () => require("ComponentAndroid"),
})();
*/

const ViewHome = styled.View`
  background: green;
`;
const ViewMenu = styled.View`
  display: none;
  background: red;
`;
const ViewHeader = styled.View`
  background: lightblue;
  display: flex;

  ${(props) =>
    props.os === "ios"
      ? `
      margin: 60px 0 0 0;`
      : `
      margin: 30px 0 0 0;`}
`;
const ViewFooter = styled.View`
  background: lightgrey;
  text-align: center;
`;
const ViewFilters = styled.View`
  display: none;
  background: yellow;
`;

function Homepage() {
  const os = Platform.OS;
  const navigation = useNavigation();
  return (
    <ViewHome>
      <ViewMenu>
        <ScrollView>
          <Text>menu</Text>
          <TouchableOpacity onPress={() => navigation.navigate("User")}>
            <Text>User page</Text>
          </TouchableOpacity>
        </ScrollView>
      </ViewMenu>
      <ViewFilters>
        <Text>Filters</Text>
      </ViewFilters>
      <ViewHeader os={os}>
        <Text>Logo</Text>
        <Text>Bibliotheque Bleue</Text>
        <TouchableOpacity onPress={() => navigation.navigate("User")}>
          <Text>Log in</Text>
        </TouchableOpacity>
      </ViewHeader>
      <ScrollView>
        <Text>IMAGE</Text>
        <TextInput placeholder="Rechercher..."></TextInput>
        <Text>MAIN APP</Text>
        <Text>footer</Text>
      </ScrollView>
      <ViewFooter>
        <Text>CGU</Text>
        <Text>Mentions légales</Text>
      </ViewFooter>
    </ViewHome>
  );
}
export default Homepage;
