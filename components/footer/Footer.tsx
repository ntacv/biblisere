import { View, Text } from "react-native";
import { styled } from "styled-components/native";
import { colors } from "styles/Variables";
import { TextCentered } from "styles/Styles";
import TextTranslated from "localization/TextTranslated";
import axios from "axios";
import { useSSR } from "react-i18next";
import { useState } from "react";
import { ApiHealth } from "types";

const Footer = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [apiStatus, setApiStatus] = useState<"loading" | "ok" | "error">(
    "loading"
  );
  const [health, setHealth] = useState<ApiHealth>();

  axios
    .get("http://localhost:8000/health")
    .then((response) => {
      setHealth(response.data);
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      health ? setIsLoading(false) : setIsLoading(true);
      health ? setApiStatus("ok") : setApiStatus("error"); // network error NOBRIDGE
    });

  return (
    <ViewFooter>
      <TextCentered>
        <TextTranslated>footer:contact</TextTranslated>
        <TextTranslated>footer:privacy</TextTranslated>
        <TextTranslated>footer:terms</TextTranslated>
      </TextCentered>
      <TextTranslated>config:status</TextTranslated>
      {health ? (
        <TextStatus health={health}>{health.status}</TextStatus>
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
