import React from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Linking,
} from "react-native";
import { styled } from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import * as Icon from "react-native-feather";

import { useTranslation } from "react-i18next";
import ChooseLanguage from "localization/ChooseLanguage";
import { fonts, colors, size } from "styles/Variables";
import * as styles from "styles/Styles";

const Content = () => {
  const { t } = useTranslation();

  const times = t("home:content:times", { returnObjects: true });
  const services = t("home:content:services", { returnObjects: true });

  return (
    <ScrollView style={{ flex: 1 }}>
      <ViewMainImage>
        <ImageMainHome source={require("assets/adaptive-icon.png")} />
      </ViewMainImage>

      <ViewContentColumn>
        <ViewFilterMenu>
          <InputContent
            placeholder={t("components:input:placeholder")}
          ></InputContent>

          <TouchableOpacity onPress={() => alert(t("components:button:click"))}>
            <Icon.Search
              width={size.icons.search}
              height={size.icons.search}
              stroke={colors.content}
            />
          </TouchableOpacity>
        </ViewFilterMenu>

        <ChooseLanguage />

        <TitleContent>{t("home:intro")}</TitleContent>
        <TextContent>{t("home:content:presentation")}</TextContent>
        <TitleContent>{t("home:titles:services")}</TitleContent>
        <View>
          {services.map((service, index) => (
            <TextContent key={index}>{service}</TextContent>
          ))}
        </View>
        <TitleContent>{t("home:titles:times")}</TitleContent>
        <View>
          {times.map((time, index) => (
            <TextContent key={index}>{time}</TextContent>
          ))}
        </View>

        <TextContent>{t("home:content:outro")}</TextContent>
      </ViewContentColumn>

      <ViewFooter>
        <TouchableOpacity
          onPress={() => Linking.openURL("https://www.cardiweb.com/contact")}
        >
          <TextContent>{t("footer:contact")}</TextContent>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            Linking.openURL("https://www.cardiweb.com/mentions-legales")
          }
        >
          <TextContent>{t("footer:terms")}</TextContent>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            Linking.openURL("https://www.cardiweb.com/mentions-legales")
          }
        >
          <TextContent>{t("footer:privacy")}</TextContent>
        </TouchableOpacity>
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
const ViewFilterMenu = styled(View)`
  display: flex;
  flex-direction: row;
  padding: 10px 0;
  justify-content: space-between;
  align-items: bottom;
`;
const InputContent = styled(TextInput)`
  border-bottom-color: black;
  border-bottom-width: 1px;
  font: ${fonts.content};
  flex: 0.9;
`;
const TitleContent = styled(Text)`
  ${styles.fontSubTitle}
`;
const TextContent = styled(Text)`
  font: ${fonts.content};
`;
const ViewContentColumn = styled(View)`
  width: 90%;
  margin: 10px auto 40px;
  gap: 10px;
`;

const ViewFooter = styled(View)`
  background: ${colors.footer};
  display: grid;
  align-items: center;
  padding: 15px 0;
`;
