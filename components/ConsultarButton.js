import React from "react";
import { Pressable, Text } from "react-native";
import styles from "../styles/styles";

export default function ConsultarButton({ onPress, title }) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
}
