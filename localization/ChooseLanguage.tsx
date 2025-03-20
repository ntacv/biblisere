import React from "react";
import { View } from "react-native";
import { styled } from "styled-components/native";

import i18next, { languages } from "localization/i18n";
import { colors, sizes } from "styles/Variables";
import Button from "components/button/Button";

const ChooseLanguage = () => {
  return (
    <Container>
      {languages.map((language) => (
        <Button
          key={language}
          label={language.toUpperCase()}
          background={
            i18next.language !== language ? colors.clickable : colors.primary
          }
          onPress={() => i18next.changeLanguage(language)}
        />
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
