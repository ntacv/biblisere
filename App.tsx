import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Homepage from "./components/homepage/Homepage";
import User from "./components/user/User";

const Stack = createNativeStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Homepage} />
      <Stack.Screen name="User" component={User} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <View>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </View>
  );
}
