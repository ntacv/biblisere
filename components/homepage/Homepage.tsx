import {
  TouchableOpacity,
  View,
  SafeAreaView,
  Text,
  ScrollView,
  TextInput,
  Platform,
  StatusBar,
} from "react-native";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import Title from "../Title";
import { color, size } from "../../styles/Variables";
import TouchableContainer from "../button/TouchableContainer";
import { useState } from "react";
import TextTranslated from "../../localization/TextTranslated";
import ChooseLanguage from "../../localization/ChooseLanguage";

/*
const Component = Platform.select({
  ios: () => require("ComponentIOS"),
  android: () => require("ComponentAndroid"),
})();
*/

const ViewHome = styled(View)`
  background: green;
`;
const ViewMenu = styled(View)<{ visible: string }>`
  background: red;
`;
const ViewHeader = styled(View)`
  background: lightblue;
  display: flex;
  flex-direction: row;

  ${(props) =>
    props.os === "ios"
      ? `
      margin: ` +
        size.header.ios +
        `px 0 0 0;`
      : `
      margin: ` +
        size.header.android +
        `px 0 0 0;`}
`;
const ViewFooter = styled(View)`
  background: lightgrey;
  text-align: center;
`;
const ViewFilters = styled(View)`
  display: none;
  background: yellow;
`;

const Menu = () => {
  return (
    <ViewMenu>
      <ScrollView>
        <Text>menu</Text>
        <TouchableContainer route="Menu">Menu</TouchableContainer>
        <TouchableOpacity onPress={() => navigation.navigate("User")}>
          <Text>User page</Text>
        </TouchableOpacity>
      </ScrollView>
    </ViewMenu>
  );
};

function Homepage() {
  const os = Platform.OS;
  const navigation = useNavigation();

  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <SafeAreaView>
      <ViewHome>
        {menuVisible ? <Menu /> : null}
        <ViewFilters>
          <Text>Filters</Text>
        </ViewFilters>
        <ViewHeader os={os}>
          <TouchableOpacity onPress={() => navigation.navigate("User")}>
            <Text>User page</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => toggleMenu()}>
            <Text>Menu</Text>
            <Text>{menuVisible}</Text>
          </TouchableOpacity>
          <Title>Bibliotheque</Title>
          <TouchableContainer route="User">Log in</TouchableContainer>
        </ViewHeader>
        <ScrollView>
          <Text>IMAGE</Text>
          <TextInput placeholder="Rechercher..."></TextInput>
          <View>
            <Text>Plongeoir Nathan;</Text>
            <TextTranslated>config:language</TextTranslated>
            <TextTranslated>translation:intro</TextTranslated>
            <ChooseLanguage />
          </View>
          <Text>MAIN APP</Text>
          <Text style={{ fontSize: 20 }}>
            What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the
            printing and typesetting industry. Lorem Ipsum has been the
            industry's standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a type
            specimen book.{"\n"} {"\n"}It has survived not only five centuries,
            but also the leap into electronic typesetting, remaining essentially
            unchanged. It was popularised in the 1960s with the release of
            Letraset sheets containing Lorem Ipsum passages, and more recently
            with desktop publishing software like Aldus PageMaker including
            versions of Lorem Ipsum. Why do we use it?
            {"\n"}
            {"\n"}
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or-less normal
            distribution of letters, as opposed to using 'Content here, content
            here', making it look like readable English. {"\n"}
            {"\n"}Many desktop publishing packages and web page editors now use
            Lorem Ipsum as their default model text, and a search for 'lorem
            ipsum' will uncover many web sites still in their infancy. Various
            versions have evolved over the years, sometimes by accident,
            sometimes on purpose (injected humour and the like). {"\n"}
            {"\n"}
            Where does it come from? Contrary to popular belief, Lorem Ipsum is
            not simply random text. It has roots in a piece of classical Latin
            literature from 45 BC, making it over 2000 years old. Richard
            McClintock, a Latin professor at Hampden-Sydney College in Virginia,
            looked up one of the more obscure Latin words, consectetur, from a
            Lorem Ipsum passage, and going through the cites of the word
          </Text>
          <Text>footer</Text>
        </ScrollView>
        <ViewFooter>
          <Text>CGU</Text>
          <Text>Mentions légales</Text>
        </ViewFooter>
      </ViewHome>
    </SafeAreaView>
  );
}
export default Homepage;
