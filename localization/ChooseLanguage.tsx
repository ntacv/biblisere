import React from "react";
import { TouchableOpacity, View, Text } from "react-native";

import TextTranslated from "localization/TextTranslated";
import i18next from "localization/i18n";

const ChooseLanguage = () => (
  <View>
    <TextTranslated>config:language</TextTranslated>
    <TouchableOpacity onPress={() => i18next.changeLanguage("en")}>
      <TextTranslated>components:translate:en</TextTranslated>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => i18next.changeLanguage("fr")}>
      <TextTranslated>components:translate:fr</TextTranslated>
    </TouchableOpacity>
  </View>
);

export default ChooseLanguage;
