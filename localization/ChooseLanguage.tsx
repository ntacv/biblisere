import React, { useTransition } from "react";
import { TouchableOpacity, View, Text } from "react-native";

import { useTranslation } from "react-i18next";

const ChooseLanguage = () => {
  const { i18n, t } = useTranslation();

  return (
    <View>
      <Text>{t("config:language")}</Text>
      <TouchableOpacity onPress={() => i18n.changeLanguage("en")}>
        <Text>{t("components:translate:en")}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => i18n.changeLanguage("fr")}>
        <Text>{t("components:translate:fr")}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ChooseLanguage;
