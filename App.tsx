import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useTranslation } from "react-i18next";
import i18next from "./localization/i18n";

export default function App() {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <Text>Plongeoir Nathan; Langue: {t("language")}</Text>
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
