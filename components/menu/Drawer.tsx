import { createDrawerNavigator } from "@react-navigation/drawer";
import Homepage from "components/homepage/Homepage";
import User from "components/user/User";
import { colors } from "styles/Variables";
import Catalog from "components/catalog/Catalog";

const Drawer = createDrawerNavigator();

const DrawerMenu = () => {
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
    >
      <Drawer.Screen name="Home" component={Homepage} />
      <Drawer.Screen name="Catalog" component={Catalog} />
      <Drawer.Screen name="Profile" component={User} />
    </Drawer.Navigator>
  );
};
export default DrawerMenu;
