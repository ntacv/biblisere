import React from "react";
import { ScrollView, TextInput, View, Text } from "react-native";
import { styled } from "styled-components/native";

import { useTranslation } from "react-i18next";
import ChooseLanguage from "localization/ChooseLanguage";
import { fonts, colors } from "styles/Variables";

const Content = () => {
  const { t } = useTranslation();

  return (
    <ScrollView style={{ flex: 1 }}>
      <ViewMainImage>
        <ImageMainHome source={require("assets/adaptive-icon.png")} />
      </ViewMainImage>

      <TextInputContent
        placeholder={t("components:input:placeholder")}
      ></TextInputContent>

      <ViewContentColumn>
        <ChooseLanguage />

        <Text>{t("lorem:long")}</Text>
        <Text>{t("lorem:long")}</Text>
        <Text>{t("lorem:long")}</Text>
        <Text>{t("lorem:long")}</Text>
        <Text>{t("lorem:long")}</Text>
        <Text>{t("lorem:long")}</Text>
        <Text>{t("lorem:long")}</Text>
        <Text>{t("lorem:long")}</Text>
      </ViewContentColumn>

      <ViewFooter>
        <Text>{t("footer:contact")}</Text>
        <Text>{t("footer:privacy")}</Text>
        <Text>{t("footer:terms")}</Text>
      </ViewFooter>
    </ScrollView>
  );
};
export default Content;

const ViewMainImage = styled(View)`
  overflow: hidden;
  height: 200px;
`;
const ImageMainHome = styled.Image`
  width: 100%;
  height: 100%;
`;

const TextInputContent = styled.TextInput`
  border-bottom-color: black;
  border-bottom-width: 1px;
  font: ${fonts.content};
  padding: 10px;
  margin: 10px;
`;

const ViewContentColumn = styled(View)`
  width: 90%;
  margin: 10px auto;
`;

const ViewFooter = styled(View)`
  background: ${colors.footer};
  display: grid;
  align-items: center;
  padding: 15px 0;
`;
