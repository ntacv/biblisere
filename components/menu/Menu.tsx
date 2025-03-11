import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";

import { StackParamList } from "types";
import { colors, size } from "styles/Variables";
import TextTranslated from "localization/TextTranslated";
import TouchableContainer from "components/button/TouchableContainer";

const ViewMenu = styled(View)<{ visible: string }>`
  background: ${colors.footer};
  position: absolute;
  top: 100px;
  min-width: 50%;
  min-height: 200px;
`;

const Menu = () => {
  const navigation = useNavigation<NavigationProp<StackParamList>>();
  return (
    <ViewMenu>
      <ScrollView>
        <TouchableContainer>
          <TextTranslated>menu:title</TextTranslated>
        </TouchableContainer>
        <TouchableOpacity onPress={() => navigation.navigate("User")}>
          <TextTranslated>user:title</TextTranslated>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("User")}>
          <TextTranslated>user:title</TextTranslated>
        </TouchableOpacity>
      </ScrollView>
    </ViewMenu>
  );
};

export default Menu;
