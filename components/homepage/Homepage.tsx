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
import { colors, size } from "styles/Variables";

import TouchableContainer from "components/button/TouchableContainer";
import TextTranslated from "localization/TextTranslated";
import ChooseLanguage from "localization/ChooseLanguage";
import Title from "components/Title";
import Menu from "components/menu/Menu";
import { TextCentered } from "styles/Styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";

function Homepage() {
  const os = Platform.OS;
  const navigation = useNavigation<NavigationProp<StackParamList>>();
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();

  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <>
      <ViewHome style={{ paddingTop: insets.top }}>
        <ViewFilters>
          <TextTranslated>components:filter:title</TextTranslated>
        </ViewFilters>
        <ViewHeader os={os}>
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
          <TextTranslated>lorem:long</TextTranslated>
          <Text>footer</Text>
        </ScrollView>
        <ViewFooter>
          <TextCentered>
            <TextTranslated>footer:contact</TextTranslated>
            <TextTranslated>footer:privacy</TextTranslated>
            <TextTranslated>footer:terms</TextTranslated>
          </TextCentered>
        </ViewFooter>
        {menuVisible ? <Menu /> : null}
      </ViewHome>
    </>
  );
}
export default Homepage;

const ViewHome = styled(View)`
  background-color: ${colors.background};
  color: ${colors.primary};
`;

const ViewHeader = styled(View)`
  display: flex;
  flex-direction: row;

  ${(props) =>
    props.os === "ios"
      ? `
      margin: ` +
        size.header.top.ios +
        `px 0 0 0;`
      : `
      margin: ` +
        size.header.top.android +
        `px 0 0 0;`}
`;
const ViewFooter = styled(View)`
  background: ${colors.footer};
  display: flex;
`;
const ViewFilters = styled(View)`
  display: none;
  background: ${colors.filters};
`;
