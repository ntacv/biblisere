import * as React from "react";
import { View, Text, Platform } from "react-native";
import { useTranslation } from "react-i18next";
import styled from "styled-components/native";

import ViewPage from "components/ViewPage";
import { colors, sizes } from "styles/Variables";
import Button from "components/button/Button";
import Title from "components/Title";
import { useNav } from "utils/navigation";
import Content from "components/homepage/Content";

import Icon from "assets/icons/Icons";
import { RouteNames } from "types";
import { DrawerActions } from "@react-navigation/native";

function Homepage() {
  const os = Platform.OS;
  const navigation = useNav();
  const { t } = useTranslation();

  return (
    <ViewPage>
      <ViewFilters>
        <Text>{t("components:filter:title")}</Text>
      </ViewFilters>

      <ViewHeader os={os}>
        <Button
          iconName="menu"
          background={colors.clickable}
          onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
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

        <Button
          iconName="user"
          onPress={() => navigation.navigate(RouteNames.User)}
        />
      </ViewHeader>

      <Content />
    </ViewPage>
  );
}
export default Homepage;

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
