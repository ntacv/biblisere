import * as React from "react";
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
import { DrawerActions } from "@react-navigation/native";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Icon from "react-native-feather";

import { colors, sizes } from "styles/Variables";

import Button from "components/button/Button";
import Title from "components/Title";
import Footer from "components/footer/Footer";
import ViewPage from "components/ViewPage";

import { getApiSchedules } from "api/apiCalls";
import * as StoreSchedules from "stores/schedules";
import * as StoreBooks from "stores/books";
import * as StoreUsers from "stores/user";
import { useStoreMap } from "node_modules/effector-react";
import { Api } from "api/apiSwagger";

const api = new Api();
import { useNav } from "utils/navigation";
import { RouteNames } from "types";
import Content from "components/homepage/Content";

function Homepage() {
  const os = Platform.OS;
  const navigation = useNav();
  const { t } = useTranslation();

  const [menuVisible, setMenuVisible] = React.useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const schedules = useStoreMap(StoreSchedules.store, (store) => store);
  const books = useStoreMap(StoreBooks.store, (store) => store);
  const user = useStoreMap(StoreUsers.store, (store) => store);

  React.useEffect(() => {
    getApiSchedules().then((response) => {
      StoreSchedules.actions.setSchedules(response);
    });

    const bookApi = api.books?.booksControllerFindAll().then((response) => {
      StoreBooks.actions.setBooks(response.data);
    });

    const userApi = api.users?.usersControllerGetMe().then((response) => {
      StoreUsers.actions.setUser(response.data);
    });
  }, []);

  return (
    <ViewPage>
      <ViewFilters>
        <Text>{t("components:filter:title")}</Text>
      </ViewFilters>

      <ViewHeader os={os}>
        <Button
          options={{ background: colors.clickable }}
          onPress={() => DrawerActions.toggleDrawer()}
        >
          <Icon.Menu
            width={sizes.icon}
            height={sizes.icon}
            stroke={colors.content}
          />
        </Button>

        <Title>
          <Icon.Book
            width={sizes.icons.title}
            height={sizes.icons.title}
            stroke={colors.primary}
            strokeWidth={3}
          />
          <Text>{t("home:name")}</Text>
        </Title>

        <Button onPress={() => navigation.navigate(RouteNames.User)}>
          <Icon.User
            width={sizes.icon}
            height={sizes.icon}
            stroke={colors.content}
          />
        </Button>
      </ViewHeader>

      <Content />
    </ViewPage>
  );
}
export default Homepage;

const ViewHeader = styled(View)`
  display: flex;
  flex-direction: row;
`;

const ViewFilters = styled(View)`
  display: none;
  background: ${colors.filters};
`;
