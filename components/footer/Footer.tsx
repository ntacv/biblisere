import { View, Text } from "react-native";
import { styled } from "styled-components/native";

import { TextCentered } from "styles/Styles";
import TextTranslated from "localization/TextTranslated";

import { useEffect } from "react";

import { useStoreMap } from "effector-react";
import * as StoreHealth from "stores/health";
import { getApiHealth } from "api/apiCalls";
import { colors } from "styles/Variables";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  const status = useStoreMap(
    StoreHealth.store,
    (store) => store.status?.status
  );

  useEffect(() => {
    getApiHealth().then((response) => {
      StoreHealth.actions.setHealth(response);
    });
  }, []);

  return (
    <ViewFooter>
      <TextCentered>
        <TextTranslated>footer:contact</TextTranslated>
        <TextTranslated>footer:privacy</TextTranslated>
        <TextTranslated>footer:terms</TextTranslated>
      </TextCentered>
      <TextTranslated>config:status</TextTranslated>
      <Text>{status ? status : t("config:loading")}</Text>
    </ViewFooter>
  );
};
export default Footer;

const ViewFooter = styled(View)`
  background: ${colors.footer};
  display: flex;
`;
