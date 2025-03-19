import * as React from "react";
import { View, Text } from "react-native";
import { styled } from "styled-components/native";

import { TextCentered } from "styles/Styles";
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

  React.useEffect(() => {
    getApiHealth().then((response) => {
      StoreHealth.actions.setHealth(response);
    });
  }, []);

  return (
    <ViewFooter>
      <TextCentered>
        <Text>footer:contact</Text>
        <Text>footer:privacy</Text>
        <Text>footer:terms</Text>
      </TextCentered>
      <Text>config:status</Text>
      <Text>{status ? status : t("config:loading")}</Text>
    </ViewFooter>
  );
};
export default Footer;

const ViewFooter = styled(View)`
  background: ${colors.footer};
  display: flex;
`;
