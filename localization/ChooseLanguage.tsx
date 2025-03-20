import React, { useTransition } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { styled } from "styled-components/native";

import { useTranslation } from "react-i18next";
import i18next, { languages } from "localization/i18n";
import { colors, sizes } from "styles/Variables";
import Button from "components/button/Button";

const ChooseLanguage = () => {
  const { t } = useTranslation();

  return (
    <Container>
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
    </Container>
  );
};
export default ChooseLanguage;

const Container = styled(View)`
  display: flex;
  flex-direction: row;
  gap: ${sizes.padding.main}px;
`;
