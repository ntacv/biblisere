import React, { useTransition } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { styled } from "styled-components/native";

import * as styles from "styles/Styles";
import { useTranslation } from "react-i18next";
import i18next, { languages } from "localization/i18n";
import { colors } from "styles/Variables";
import Button from "components/button/Button";
import { lang } from "moment";

const ChooseLanguage = () => {
  const { t } = useTranslation();

  return (
    <ViewContainer>
      {languages.map((language) => (
        <Button
          key={language}
          options={{
            background:
              i18next.language !== language ? colors.clickable : colors.primary,
          }}
          onPress={() => i18next.changeLanguage(language)}
        >
          {t("components:translate:" + language)}
        </Button>
      ))}
    </ViewContainer>
  );
};
export default ChooseLanguage;

const ViewContainer = styled(View)`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;
