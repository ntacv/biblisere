import * as React from "react";
import { View, SafeAreaView, Text } from "react-native";
import { useTranslation } from "react-i18next";
import styled from "styled-components/native";

import { colors, sizes } from "styles/Variables";
import Button from "components/button/Button";
import Title from "components/Title";
import { useNav } from "utils/navigation";
import Content from "components/homepage/Content";

import Icon from "assets/icons/Icons";
import { RouteNames } from "types";
import { DrawerActions } from "@react-navigation/native";
import { useStoreMap } from "effector-react";

import * as StoreBooks from "stores/books";
import * as StoreUsers from "stores/user";

import { Api } from "api/apiSwagger";
const api = new Api();

function Homepage() {
  const navigation = useNav();
  const { t } = useTranslation();

  const books = useStoreMap(StoreBooks.store, (store) => store);
  const user = useStoreMap(StoreUsers.store, (store) => store);

  React.useEffect(() => {

    const bookApi = api.books?.booksControllerFindAll().then((response) => {
      StoreBooks.actions.setBooks(response.data);
    });
	}, []);

  return (
    <ViewHome>
      <ViewFilters>
        <Text>{t("components:filter:title")}</Text>
      </ViewFilters>

      <ViewHeader>
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
`;
const ViewFilters = styled(View)`
  display: none;
  background: ${colors.filters};
`;
