import { TouchableOpacity, View, Text } from "react-native";
import { useTranslation } from "react-i18next";

import { useNav } from "utils/navigation";

const User = () => {
  const navigation = useNav();
  const { t } = useTranslation();

  return (
    <View>
      <Text>{t("user:title")}</Text>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text>{t("homepage:title")}</Text>
      </TouchableOpacity>
    </View>
  );
};
export default User;
