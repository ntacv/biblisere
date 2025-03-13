import { Text } from "react-native";
import { styled } from "styled-components/native";
import { colors } from "./Variables";

export const TextCentered = styled(Text)`
  text-align: center;
`;

export const fontTitle = `
  font-size: 35px;
  font-weight: 700;
  font-family: sans-serif;
  color: ${colors.primary};
  `;

export const fontContent = `
  font-size: 20px;
  font-weight: 400;
  font-family: sans-serif;
  color: #333;
  `;
