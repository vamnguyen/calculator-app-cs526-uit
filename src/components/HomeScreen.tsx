import { useState } from "react";
import { SafeAreaView, StyleSheet, Switch, Text, View } from "react-native";
import { myColors } from "../styles/Colors";
import { ThemeContext } from "../context/ThemeContext";
import MyKeyboard from "./MyKeyboard";

const HomeScreen = () => {
  const [theme, setTheme] = useState("light");
  return (
    <ThemeContext.Provider value={theme}>
      <SafeAreaView
        style={
          theme === "light"
            ? styles.container
            : [styles.container, { backgroundColor: "black" }]
        }
      >
        <View style={{ marginTop: 35, display: "flex", alignItems: "center" }}>
          <Text
            style={{
              color: `${theme === "light" ? myColors.dark : myColors.light}`,
              fontSize: 30,
            }}
          >
            {theme === "light" ? "Light Theme" : "Dark Theme"}
          </Text>
          <Switch
            value={theme === "dark"}
            onValueChange={() => setTheme(theme === "light" ? "dark" : "light")}
          />
        </View>
        <MyKeyboard />
      </SafeAreaView>
    </ThemeContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: myColors.light,
    alignItems: "center",
    justifyContent: "flex-start",
  },
});

export default HomeScreen;