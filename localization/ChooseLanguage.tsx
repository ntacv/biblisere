import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { useTranslation } from "react-i18next";
import i18next from "./i18n";

const ChooseLanguage = () => {
  const { t } = useTranslation();
  return (
    <View>
      <TouchableOpacity onPress={() => i18next.changeLanguage("en")}>
        <Text style={{ color: "green" }}>EN</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => i18next.changeLanguage("fr")}>
        <Text style={{ color: "green" }}>FR</Text>
      </TouchableOpacity>
    </View>
  );
};
export default ChooseLanguage;
