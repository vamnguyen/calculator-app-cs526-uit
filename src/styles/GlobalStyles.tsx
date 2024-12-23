import { StyleSheet } from "react-native";
import { myColors } from "./Colors";

export const Styles = StyleSheet.create({
  // Button
  btnBlue: {
    width: 72,
    height: 72,
    borderRadius: 24,
    backgroundColor: myColors.blue,
    justifyContent: "center",
    alignItems: "center",
    margin: 8,
  },
  btnDark: {
    width: 72,
    height: 72,
    borderRadius: 24,
    backgroundColor: myColors.btnDark,
    justifyContent: "center",
    alignItems: "center",
    margin: 8,
  },
  btnLight: {
    width: 72,
    height: 72,
    borderRadius: 24,
    backgroundColor: myColors.white,
    justifyContent: "center",
    alignItems: "center",
    margin: 8,
  },
  btnGray: {
    width: 72,
    height: 72,
    borderRadius: 24,
    backgroundColor: myColors.btnGray,
    justifyContent: "center",
    alignItems: "center",
    margin: 8,
  },
  smallTextLight: {
    fontSize: 32,
    color: myColors.white,
  },
  smallTextDark: {
    fontSize: 32,
    color: myColors.black,
  },
  // Keyboard
  row: {
    maxWidth: "100%",
    flexDirection: "row",
  },
  viewBottom: {
    position: "absolute",
    bottom: 50,
  },
  resultNumber: {
    fontSize: 60,
    color: myColors.gray,
    fontWeight: "200",
    alignSelf: "flex-end",
  },
  // Style for the operation symbol
  operation: {
    color: "purple",
    fontSize: 40,
    fontWeight: "500",
  },
  // Style for displaying the full calculation
  calculationText: {
    color: myColors.gray,
    fontSize: 30,
    alignSelf: "flex-end",
  },
});
