import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { useTranslation } from "react-i18next";
import i18next from "./i18n";
import TextTranslated from "./TextTranslated";

const ChooseLanguage = () => {
  const { t } = useTranslation();
  return (
    <View>
      <TextTranslated>config:language</TextTranslated>
      <TouchableOpacity onPress={() => i18next.changeLanguage("en")}>
        <TextTranslated style={{ color: "green", backgroundColor: "red" }}>
          components:translate:en
        </TextTranslated>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => i18next.changeLanguage("fr")}>
        <TextTranslated style={{ color: "green", backgroundColor: "red" }}>
          components:translate:fr
        </TextTranslated>
      </TouchableOpacity>
    </View>
  );
};
export default ChooseLanguage;
