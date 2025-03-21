import { TouchableOpacity, Text, SafeAreaView } from "react-native";
import { useTranslation } from "react-i18next";

import ViewPage from "components/ViewPage";
import { useNav } from "utils/navigation";
import { DrawerActions } from "@react-navigation/native";

const User = () => {
  const navigation = useNav();
  const { t } = useTranslation();

  return (
    <ViewPage>
      <Text>{t("user:title")}</Text>
      <TouchableOpacity
        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
      >
        <Text>{t("menu:title")}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={navigation.goBack}>
        <Text>{t("homepage:title")}</Text>
      </TouchableOpacity>
    </ViewPage>
  );
};
export default User;
