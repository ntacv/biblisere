import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import TextTranslated from "./localization/TextTranslated";
import ChooseLanguage from "./localization/ChooseLanguage";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Plongeoir Nathan;</Text>
      <TextTranslated>config:language</TextTranslated>
      <TextTranslated>translation:intro</TextTranslated>
      <ChooseLanguage />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
