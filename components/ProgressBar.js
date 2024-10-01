import React from "react";
import { View, Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import styles from "../styles/styles";

export default function ProgressBar({ progressAnim }) {
  return (
    <View style={styles.progressBarBackground}>
      <Animated.View
        style={[
          styles.animatedProgressBar,
          {
            width: progressAnim.interpolate({
              inputRange: [0, 1],
              outputRange: ["0%", "100%"],
            }),
          },
        ]}
      >
        <LinearGradient
          colors={["#4CAF50", "#8BC34A", "#CDDC39"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.progressBarFill}
        />
      </Animated.View>
    </View>
  );
}
