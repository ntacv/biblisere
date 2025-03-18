import React, { useState } from "react";
import { TouchableOpacity, View, Text, Platform } from "react-native";
import { useTranslation } from "react-i18next";
import styled from "styled-components/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Icon from "react-native-feather";

import { colors, size } from "styles/Variables";
import Button from "components/button/Button";
import Title from "components/Title";
import Menu from "components/menu/Menu";
import { useNav } from "utils/navigation";
import Content from "components/homepage/Content";

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
    <ViewHome style={{ paddingTop: insets.top, flex: 1 }}>
      <ViewFilters>
        <Text>{t("components:filter:title")}</Text>
      </ViewFilters>

      <ViewHeader os={os}>
        <TouchableOpacity onPress={() => toggleMenu()}>
          <Icon.Menu
            width={size.icon}
            height={size.icon}
            stroke={colors.content}
          />
        </TouchableOpacity>

        <Title>
          <Text>{t("home:name")}</Text>
        </Title>

        <Button onPress={() => navigation.navigate("User")}>
          <Icon.User
            width={size.icon}
            height={size.icon}
            stroke={colors.content}
          />
        </Button>
      </ViewHeader>

      <Content />

      {menuVisible ? <Menu /> : null}
    </ViewHome>
  );
}
export default Homepage;

const iconStyle = `
  width = "40",
`;

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
const ViewFilters = styled(View)`
  display: none;
  background: ${colors.filters};
`;
