import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";

import Homepage from "components/homepage/Homepage";
import User from "components/user/User";
import { routesType } from "types";

const Stack = createNativeStackNavigator<routesType>();

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <RootStack />
      </SafeAreaProvider>
    </NavigationContainer>
  );
}

const RootStack = () => {
  return (
    <Stack.Navigator
      id={undefined}
      initialRouteName="Homepage"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Homepage" component={Homepage} />
      <Stack.Screen name="User" component={User} />
    </Stack.Navigator>
  );
};
