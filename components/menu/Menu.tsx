import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

import { useNav } from "utils/navigation";
import { colors } from "styles/Variables";
import { useTranslation } from "react-i18next";

const Menu = () => {
  const navigation = useNav();
  const { t } = useTranslation();
  return (
    <ViewMenu>
      <ScrollView>
        <TouchableOpacity onPress={() => navigation.navigate("User")}>
          <Text>{t("user:title")}</Text>
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
