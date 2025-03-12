import { View, Text } from "react-native";
import { styled } from "styled-components/native";
import { colors } from "styles/Variables";
import { TextCentered } from "styles/Styles";
import TextTranslated from "localization/TextTranslated";
import axios from "axios";
import { useEffect, useState } from "react";
import { ApiHealth } from "types";
import { useUnit } from "effector-react";
import { $storeHealth } from "store";
import { getApiHealth } from "api/apiHealth";

const Footer = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [apiStatus, setApiStatus] = useState<"loading" | "ok" | "error">(
    "loading"
  );
  const storeHealth = useUnit<{ data: ApiHealth }>($storeHealth);

  return (
    <ViewFooter>
      <TextCentered>
        <TextTranslated>footer:contact</TextTranslated>
        <TextTranslated>footer:privacy</TextTranslated>
        <TextTranslated>footer:terms</TextTranslated>
      </TextCentered>
      <TextTranslated>config:status</TextTranslated>

      {storeHealth.data ? (
        <Text>{storeHealth.data.status}</Text>
      ) : (
        <Text>{apiStatus}</Text>
      )}
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
