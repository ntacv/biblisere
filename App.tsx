import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import DrawerMenu from "./components/menu/Drawer";

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <DrawerMenu />
      </SafeAreaProvider>
    </NavigationContainer>
  );
}
