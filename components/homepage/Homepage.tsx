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
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { colors, size } from "styles/Variables";
import Button from "components/button/Button";
import ChooseLanguage from "localization/ChooseLanguage";
import Title from "components/Title";
import Menu from "components/menu/Menu";
import Footer from "components/footer/Footer";
import { getApiSchedules } from "api/apiCalls";
import * as StoreSchedules from "stores/schedules";
import * as StoreBooks from "stores/books";
import * as StoreUsers from "stores/user";
import { useStoreMap } from "node_modules/effector-react";
import { Api } from "api/apiSwagger";

const api = new Api();
import { useNav } from "utils/navigation";

function Homepage() {
  const os = Platform.OS;
  const navigation = useNav();
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();

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
    <ViewHome insets={insets}>
      <ViewFilters>
        <Text>{t("components:filter:title")}</Text>
      </ViewFilters>

      <ViewHeader os={os}>
        <TouchableOpacity onPress={() => toggleMenu()}>
          <Text>{t("menu:title")}</Text>
        </TouchableOpacity>

        <Title>{t("home:name")}</Title>

        <Button onPress={() => navigation.navigate("User")}>
          <Text>{t("menu:login")}</Text>
        </Button>
      </ViewHeader>

      <ScrollView>
        <TextInput placeholder={t("components:input:placeholder")}></TextInput>

        <ChooseLanguage />

        {schedules.data?.map((schedule) => (
          <Text key={schedule.id}>
            {schedule.title} | {schedule.openingTime.hours}:
            {schedule.openingTime.minutes} - {schedule.closingTime.hours}:
            {schedule.closingTime.minutes}
          </Text>
        ))}

        <Text>
          {t("menu:login") +
            t("config:text:colon") +
            (user.data?.email ? user.data?.email : t("errors:notConnected"))}
        </Text>

        {books.data?.map((book) => (
          <Text key={book.id}>{book.title}</Text>
        ))}
      </ScrollView>
      <Footer />
      {menuVisible && <Menu />}
    </ViewHome>
  );
}
export default Homepage;

const ViewHome = styled(View)`
  padding-top: ${(props) => props.insets.top}px;
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
