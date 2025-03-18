import { View, Text } from "react-native";
import { useTranslation } from "react-i18next";

import { useNav } from "utils/navigation";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import ChooseLanguage from "localization/ChooseLanguage";

const DrawerContentCustom = (props) => {
  const { t } = useTranslation();
  const navigation = useNav();

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <View>
        <ChooseLanguage />
      </View>
    </DrawerContentScrollView>
  );
};
export default DrawerContentCustom;
