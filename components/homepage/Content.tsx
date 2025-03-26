import * as React from "react";
import { Image, ScrollView, Text, TextInput, View } from "react-native";
import { styled } from "styled-components/native";

import Button from "components/button/Button";
import TextLink from "components/button/TextLink";
import { useTranslation } from "react-i18next";
import * as styles from "styles/Styles";
import { colors, fonts, sizes } from "styles/Variables";

import Icon from "assets/icons/Icons";
import { useStoreMap } from "effector-react";
import * as StoreSchedules from "stores/schedules";

import { Api } from "api/apiSwagger";
const api = new Api();

const Content = () => {
  const { t } = useTranslation();
	const services = t("home:content:services", { returnObjects: true });

	const schedules = useStoreMap(StoreSchedules.store, (store) => store);

	React.useEffect(() => {
		const schedulesApi = api.schedules
			?.schedulesControllerFindAllSchedules()
			
		schedulesApi.then((response) => {
				StoreSchedules.actions.setSchedules(response.data);
			});
	}, []);

  return (
    <ScrollViewContent>
      <ImageMainHome
        source={require("assets/images/mediatheque_espace_lecture.jpg")}
      />

      <ContentColumn>
        <ViewSearchBar>
          <InputContent placeholder={t("components:input:placeholder")} />

          <Button
            label="Search"
            iconName="search"
            onPress={() => alert(t("components:button:click"))}
          />
        </ViewSearchBar>

        <TitleContent>{t("home:intro")}</TitleContent>
        <TextContent>{t("home:content:presentation")}</TextContent>

        <TitleContent>{t("home:titles:services")}</TitleContent>
        <View>
          {services.map((service, index) => (
            <TextContent key={index}>{service}</TextContent>
          ))}
        </View>

        <ViewAccess>
          <TitleContent>
            <Icon
              iconName="mapPin"
              width={sizes.icons.content}
              height={sizes.icons.content}
              stroke={colors.primary}
            />

            {t("home:titles:times")}
          </TitleContent>

          {schedules.data?.map((schedule) => (
            <TextContent key={schedule.id}>
              {t("home:content:days:" + [schedule.dayNumber - 1]) +
                " - " +
                schedule.openingTime.hours +
                ":" +
                (schedule.openingTime.minutes == 0
                  ? "00"
                  : schedule.openingTime.minutes) +
                " - " +
                schedule.closingTime.hours +
                ":" +
                (schedule.closingTime.minutes == 0
                  ? "00"
                  : schedule.closingTime.minutes)}
            </TextContent>
          ))}
        </ViewAccess>
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
  height: ${sizes.height.image}px;
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
