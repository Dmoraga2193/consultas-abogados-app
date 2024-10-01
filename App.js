import React from "react";
import ConsultaLegalScreen from "./screens/ConsultaLegalScreen";
import { StyleSheet, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <ConsultaLegalScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
