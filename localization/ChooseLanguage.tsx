import React, { useTransition } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { styled } from "styled-components/native";

import * as styles from "styles/Styles";
import { useTranslation } from "react-i18next";
import i18next from "localization/i18n";

const ChooseLanguage = () => {
  const { t } = useTranslation();

  return (
    <ViewContainer>
      <TouchableOpacity onPress={() => i18next.changeLanguage("en")}>
        <TextLanguage language="en">
          {t("components:translate:en")}
        </TextLanguage>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => i18next.changeLanguage("fr")}>
        <TextLanguage language="fr">
          {t("components:translate:fr")}
        </TextLanguage>
      </TouchableOpacity>
    </ViewContainer>
  );
};
export default ChooseLanguage;

const ViewContainer = styled(View)`
  display: flex;
  flex-direction: row;
  gap: 10px;
  margin: 10px;
`;

const TextLanguage = styled(Text)`
  ${styles.fontContent}
  color: ${(props) =>
    props.language === i18next.language ? "green" : "black"};
`;
