import { ScrollView, View, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

import { useNav } from "utils/navigation";
import { colors } from "styles/Variables";
import TextTranslated from "localization/TextTranslated";
import Button from "components/button/Button";

const Menu = () => {
  const navigation = useNav();
  return (
    <ViewMenu>
      <ScrollView>
        <TouchableOpacity onPress={() => navigation.navigate("User")}>
          <TextTranslated>user:title</TextTranslated>
        </TouchableOpacity>
      </ScrollView>
    </ViewMenu>
  );
};
export default Menu;

const ViewMenu = styled(View)`
  background: ${colors.footer};
  position: absolute;
  top: 100px;
  min-width: 50%;
  min-height: 200px;
`;
