import { NavigationContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";

import Homepage from "./components/homepage/Homepage";
import User from "./components/user/User";
import { StackParamList } from "./types";

const Stack = createNativeStackNavigator<StackParamList>();

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

export default function App() {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}
