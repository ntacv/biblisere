import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { routesType } from "types";
import DrawerMenu from "./components/menu/Drawer";

const Stack = createNativeStackNavigator<routesType>();

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <DrawerMenu />
      </SafeAreaProvider>
    </NavigationContainer>
  );
}
