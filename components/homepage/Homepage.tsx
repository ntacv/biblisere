import { useEffect, useState } from "react";
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
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Footer from "components/footer/Footer";
import { getApiSchedules } from "api/apiCalls";
import * as StoreSchedules from "stores/schedules";
import { useStoreMap } from "node_modules/effector-react";

function Homepage() {
  const os = Platform.OS;
  const navigation = useNavigation<NavigationProp<StackParamList>>();
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();

  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const schedules = useStoreMap(StoreSchedules.store, (store) => store);

  useEffect(() => {
    getApiSchedules().then((response) => {
      StoreSchedules.actions.setSchedules(response);
      console.log(response);
    });
  }, []);

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

          <Text>Schedules: {schedules.status?.title}.</Text>

          <TextTranslated>lorem:long</TextTranslated>
          <Text>footer</Text>
        </ScrollView>
        <Footer />
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
const ViewFilters = styled(View)`
  display: none;
  background: ${colors.filters};
`;
