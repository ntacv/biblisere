import React, { useState } from "react";
import { View, SafeAreaView, Text, Platform } from "react-native";
import { useTranslation } from "react-i18next";
import styled from "styled-components/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { colors, sizes } from "styles/Variables";
import Button from "components/button/Button";
import Title from "components/Title";
import Menu from "components/menu/Menu";
import { useNav } from "utils/navigation";
import Content from "components/homepage/Content";

import Icon from "assets/icons/Icons";

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
    <ViewHome>
      <ViewFilters>
        <Text>{t("components:filter:title")}</Text>
      </ViewFilters>

      <ViewHeader os={os}>
        <Button
          iconName="menu"
          background={colors.clickable}
          onPress={toggleMenu}
        />

        <Title>
          <Icon
            iconName="book"
            width={sizes.icons.title}
            height={sizes.icons.title}
            stroke={colors.primary}
            strokeWidth={3}
          />
          <Text>{t("home:name")}</Text>
        </Title>

        <Button iconName="user" onPress={() => navigation.navigate("User")} />
      </ViewHeader>

      <Content />

      {menuVisible ? <Menu /> : null}
    </ViewHome>
  );
}
export default Homepage;

const ViewHome = styled(SafeAreaView)`
  flex: 1;
  background-color: ${colors.background};
  color: ${colors.primary};
`;

const ViewHeader = styled(View)`
  display: flex;
  flex-direction: row;
  padding: ${sizes.padding.main}px ${sizes.padding.main}px;
  margin: ${(props) =>
      props.os === "ios" ? sizes.header.top.ios : sizes.header.top.android}px
    0 0 0;
`;
const ViewFilters = styled(View)`
  display: none;
  background: ${colors.filters};
`;
