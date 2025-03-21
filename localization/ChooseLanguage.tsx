import { TouchableOpacity, View, Text } from "react-native";

import { useTranslation } from "react-i18next";
import i18next from "localization/i18n";

const ChooseLanguage = () => {
  const { t } = useTranslation();

  return (
    <View>
      <Text>{t("config:language")}</Text>
      <TouchableOpacity onPress={() => i18next.changeLanguage("en")}>
        <Text>{t("components:translate:en")}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => i18next.changeLanguage("fr")}>
        <Text>{t("components:translate:fr")}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChooseLanguage;
