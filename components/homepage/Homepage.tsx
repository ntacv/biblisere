import { useState } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  TextInput,
  Platform,
} from "react-native";
import { useTranslation } from "react-i18next";
import styled from "styled-components/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { colors, size } from "styles/Variables";
import Button from "components/button/Button";
import ChooseLanguage from "localization/ChooseLanguage";
import Title from "components/Title";
import Menu from "components/menu/Menu";
import { useNav } from "utils/navigation";

function Homepage() {
  const os = Platform.OS;
  const navigation = useNav();
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();

  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <ViewHome style={{ paddingTop: insets.top }}>
      <ViewFilters>
        <Text>{t("components:filter:title")}</Text>
      </ViewFilters>

      <ViewHeader os={os}>
        <TouchableOpacity onPress={() => toggleMenu()}>
          <Text>{t("menu:title")}</Text>
        </TouchableOpacity>

        <Title>
          <Text>{t("home:name")}</Text>
        </Title>

        <Button onPress={() => navigation.navigate("User")}>
          <Text>{t("menu:login")}</Text>
        </Button>
      </ViewHeader>

      <ScrollView>
        <Text>IMAGE</Text>
        <TextInput placeholder={t("components:input:placeholder")}></TextInput>

        <View>
          <ChooseLanguage />
        </View>

        <Text>MAIN APP</Text>
        <Text>{t("lorem:long")}</Text>
      </ScrollView>

      <ViewFooter>
        <Text>{t("footer:contact")}</Text>
        <Text>{t("footer:privacy")}</Text>
        <Text>{t("footer:terms")}</Text>
      </ViewFooter>

      {menuVisible ? <Menu /> : null}
    </ViewHome>
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

  margin: ${(props) =>
      props.os === "ios" ? size.header.top.ios : size.header.top.android}px
    0 0 0;
`;
const ViewFooter = styled(View)`
  background: ${colors.footer};
  display: grid;
  align-items: center;
`;
const ViewFilters = styled(View)`
  display: none;
  background: ${colors.filters};
`;
