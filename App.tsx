import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Homepage from "./components/homepage/Homepage";
import User from "./components/user/User";

const Stack = createNativeStackNavigator();
const Screen = Stack.Screen;

function RootStack() {
  return (
    <Stack.Navigator
      id={undefined}
      initialRouteName="Homepage"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen component={Homepage} name="Homepage" />
      <Stack.Screen name="User" component={User} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}
