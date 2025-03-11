import { useState } from "react";
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
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import styled from "styled-components/native";

import { StackParamList } from "types";
import { color, size } from "styles/Variables";

import TouchableContainer from "components/button/TouchableContainer";
import TextTranslated from "localization/TextTranslated";
import ChooseLanguage from "localization/ChooseLanguage";
import Title from "components/Title";
import Menu from "components/menu/Menu";

/*
const Component = Platform.select({
  ios: () => require("ComponentIOS"),
  android: () => require("ComponentAndroid"),
})();
*/

const ViewHome = styled(View)`
  background: green;
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

function Homepage() {
  const os = Platform.OS;
  const navigation = useNavigation<NavigationProp<StackParamList>>();
  const { t } = useTranslation();

  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <SafeAreaView>
      <ViewHome>
        <ViewFilters>
          <TextTranslated>components:filter:title</TextTranslated>
        </ViewFilters>
        <ViewHeader os={os}>
          <TouchableOpacity onPress={() => navigation.navigate("User")}>
            <TextTranslated>user:title</TextTranslated>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => toggleMenu()}>
            <TextTranslated>menu:title</TextTranslated>
          </TouchableOpacity>
          <Title>
            <TextTranslated>home:name</TextTranslated>
          </Title>
          <TouchableContainer route="User">
            <TextTranslated>menu:login</TextTranslated>
          </TouchableContainer>
        </ViewHeader>
        <ScrollView>
          <Text>IMAGE</Text>
          <TextInput
            placeholder={t("components:input:placeholder")}
          ></TextInput>
          <View>
            <ChooseLanguage />
          </View>
          <Text>MAIN APP</Text>
          <TextTranslated style={{ fontSize: 20 }}>lorem:long</TextTranslated>
          <Text>footer</Text>
        </ScrollView>
        <ViewFooter>
          <TextTranslated>footer:contact</TextTranslated>
          <TextTranslated>footer:privacy</TextTranslated>
          <TextTranslated>footer:terms</TextTranslated>
        </ViewFooter>
        {menuVisible ? <Menu /> : null}
      </ViewHome>
    </SafeAreaView>
  );
}
export default Homepage;
