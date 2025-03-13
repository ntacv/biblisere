import { View, Text } from "react-native";
import { styled } from "styled-components/native";

import { TextCentered } from "styles/Styles";
import TextTranslated from "localization/TextTranslated";

import { useEffect } from "react";

import { useStoreMap } from "effector-react";
import * as StoreHealth from "stores/health";
import { getApiHealth } from "api/apiHealth";
import { colors } from "styles/Variables";

const Footer = () => {
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

      {status ? <Text>{status}</Text> : <Text>loading...</Text>}
    </ViewFooter>
  );
};
export default Footer;

const ViewFooter = styled(View)`
  background: ${colors.footer};
  display: flex;
`;

const TextStatus = styled(Text)<{ health: string }>`
  color: ${(props) =>
    props.health.status == "ok" ? colors.success : colors.danger};
`;
