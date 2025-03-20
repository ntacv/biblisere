import React from "react";
import { ScrollView, View, Text, TextInput, Image } from "react-native";
import { styled } from "styled-components/native";

import { useTranslation } from "react-i18next";
import ChooseLanguage from "localization/ChooseLanguage";
import { fonts, colors, sizes } from "styles/Variables";
import * as styles from "styles/Styles";
import Button from "components/button/Button";
import TextLink from "components/button/TextLink";

import IconMapPin from "assets/icons/map-pin.svg";

const Content = () => {
  const { t } = useTranslation();

  const times = t("home:content:times", { returnObjects: true });
  const services = t("home:content:services", { returnObjects: true });

  return (
    <ScrollViewContent>
      <ImageMainHome
        source={require("assets/images/mediatheque_espace_lecture.jpg")}
      />

      <ContentColumn>
        <ViewSearchBar>
          <InputContent
            placeholder={t("components:input:placeholder")}
          ></InputContent>

          <Button
            label="Search"
            iconName="search"
            onPress={() => alert(t("components:button:click"))}
          />
        </ViewSearchBar>

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

        <ViewAccess>
          <Text>{t("home:titles:access")}</Text>
          <IconMapPin
            width={sizes.icon}
            height={sizes.icon}
            stroke={colors.primary}
          />
        </ViewAccess>

        <TextContent>{t("home:content:outro")}</TextContent>
      </ContentColumn>

      <ViewFooter>
        <TextLink url="https://www.cardiweb.com/contact">
          {t("footer:contact")}
        </TextLink>

        <TextLink url="https://www.cardiweb.com/mentions-legales">
          {t("footer:terms")}
        </TextLink>

        <TextLink url="https://www.cardiweb.com/mentions-legales">
          {t("footer:privacy")}
        </TextLink>
      </ViewFooter>
    </ScrollViewContent>
  );
};
export default Content;

const ScrollViewContent = styled(ScrollView)`
  flex: 1;
`;
const ImageMainHome = styled(Image)`
  height: 200px;
  width: 100%;
  object-fit: cover;
  opacity: 0.87;
`;
const ViewSearchBar = styled(View)`
  ${styles.PrimaryContainer}
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  max-width: 400px;
`;
const InputContent = styled(TextInput)`
  border-bottom-color: ${colors.primary};
  border-bottom-width: 2px;
  font: ${fonts.content};
  height: ${sizes.text.input}px;
  flex: 1;
  margin: 0 ${sizes.padding.main}px;
`;
const ViewAccess = styled(View)`
  ${styles.PrimaryContainer}
`;
const TitleContent = styled(Text)`
  ${styles.fontSubTitle}
`;
const TextContent = styled(Text)`
  font: ${fonts.content};
`;
const ContentColumn = styled(View)`
  margin: ${sizes.padding.main}px ${sizes.padding.main}px
    ${sizes.padding.bottom}px;
  gap: ${sizes.padding.main}px;
`;

const ViewFooter = styled(View)`
  background: ${colors.footer};
  display: grid;
  align-items: center;
  padding: ${sizes.padding.main}px 0;
`;
