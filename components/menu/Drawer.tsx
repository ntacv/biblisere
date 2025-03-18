import { createDrawerNavigator } from "@react-navigation/drawer";
import { useTranslation } from "react-i18next";

import Homepage from "components/homepage/Homepage";
import User from "components/user/User";
import Catalog from "components/catalog/Catalog";
import { colors } from "styles/Variables";
import DrawerContentCustom from "components/menu/DrawerContentCustom";

const Drawer = createDrawerNavigator();

const DrawerMenu = () => {
  const { t } = useTranslation();
  const isAdmin = false;

  return (
    <Drawer.Navigator
      id={undefined}
      initialRouteName="Home"
      backBehavior={"history"}
      screenOptions={{
        headerShown: false,
        drawerType: "slide",
        drawerStyle: { backgroundColor: "white" },
      }}
      drawerContent={(props) => <DrawerContentCustom {...props} />}
    >
      <Drawer.Screen
        name="Home"
        component={Homepage}
        options={{ title: t("home:title") }}
      />
      <Drawer.Screen
        name="Catalog"
        component={Catalog}
        options={{ title: t("catalog:title") }}
      />
      <Drawer.Screen
        name="User"
        component={User}
        options={{ title: !isAdmin ? t("user:title") : t("admin:title") }}
      />
    </Drawer.Navigator>
  );
};
export default DrawerMenu;
