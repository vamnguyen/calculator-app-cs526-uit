import * as React from "react";
import Button from "./Button";
import { View, Text, Alert } from "react-native";
import { Styles } from "../styles/GlobalStyles";
import { myColors } from "../styles/Colors";
import { numberButtons } from "../constants";

export default function MyKeyboard() {
  const [expression, setExpression] = React.useState("");
  const [currentNumber, setCurrentNumber] = React.useState("0");
  const [result, setResult] = React.useState<string | null>(null);

  const handleNumberPress = (number: string) => {
    if (expression.endsWith("=")) {
      // If the expression ends with "=", clear the expression and start a new one
      setExpression(number);
    } else {
      setExpression(expression + number);
    }
  };

  const handleOperationPress = (operation: string) => {
    switch (operation) {
      case "+/-":
        if (!result) {
          Alert.alert("Invalid operation", "Please calculate the result first");
        } else {
          setResult((prev) => (Number(prev) * -1).toString()); // Change the sign of the number
        }
        break;

      case "％":
        if (expression.endsWith("=")) {
          setExpression(result + " % ");
        } else if (expression.endsWith(" ")) {
          setExpression(expression.slice(0, -2) + "% ");
        } else if (expression !== "") {
          setExpression(expression + " % ");
        }
        break;

      case "+":
      case "-":
      case "*":
      case "/":
        if (expression.endsWith("=")) {
          setExpression(result + " " + operation + " ");
        } else if (expression.endsWith(" ")) {
          setExpression(expression.slice(0, -2) + operation + " ");
        } else if (expression !== "") {
          setExpression(expression + " " + operation + " ");
        }
        break;

      case ".":
        const lastChar = expression[expression.length - 1];
        if (!numberButtons.hasOwnProperty(lastChar)) {
          break;
        } else {
          // Last expression is a number
          setExpression(expression + ".");
        }
        break;

      case "⌫":
        if (expression.endsWith(" ")) {
          // If the expression ends with an operator followed by a space, remove the last 3 characters (operator and spaces)
          setExpression(expression.slice(0, -3));
        } else {
          // Otherwise, remove the last character
          setExpression(expression.slice(0, -1));
        }

        // If the expression becomes empty, reset the current number to "0"
        if (expression.length <= 1) {
          clear();
        }

      default:
        break;
    }
  };

  const clear = () => {
    setExpression("");
    setCurrentNumber("0");
    setResult(null);
  };

  const getResult = () => {
    // Check if the expression is empty
    if (!expression) {
      return;
    }

    // Check for divide by zero
    if (expression.includes("/ 0")) {
      Alert.alert("Invalid operation", "Cannot divide by zero");
      return;
    }

    // Ensure the expression does not end with an operator
    const lastChar = expression.trim().slice(-1);
    if (["+", "-", "*", "/", "%", " "].includes(lastChar)) {
      Alert.alert(
        "Invalid operation",
        "Expression cannot end with an operator"
      );
      return;
    }

    try {
      // Evaluate the expression safely
      let result = eval(expression);

      // Format the result
      if (Number.isInteger(result)) {
        // If the result is an integer, just convert it to a string
        result = result.toString();
      } else {
        // If the result is a decimal, limit it to 4 decimal places
        result = result.toFixed(4).toString();
      }

      setResult(result);
      setCurrentNumber("");

      // Display the complete expression with the equal sign
      setExpression(expression + " =");
    } catch (error) {
      // Catch and display any syntax errors
      Alert.alert(
        "Error",
        "Invalid expression. Please correct it and try again."
      );
    }
  };

  const displayExpression = () => {
    return (
      <Text style={[Styles.calculationText, { color: myColors.gray }]}>
        {expression}
      </Text>
    );
  };

  return (
    <View style={Styles.viewBottom}>
      <View
        style={{
          height: 120,
          width: "90%",
          justifyContent: "flex-end",
          alignSelf: "center",
        }}
      >
        {expression ? displayExpression() : null}

        <Text style={[Styles.resultNumber, { color: myColors.result }]}>
          {/* Display the result */}
          {result ?? (
            <Text
              style={{
                fontSize: 96,
                color: myColors.result,
                fontWeight: "500",
              }}
            >
              {result}
            </Text>
          )}

          {/* Display the result of current expression */}
          {!result && expression && !expression.endsWith(" ") ? (
            <Text style={Styles.resultNumber}>{eval(expression)}</Text>
          ) : (
            currentNumber && (
              <Text style={Styles.resultNumber}>{currentNumber}</Text>
            )
          )}
        </Text>
      </View>

      {/* Buttons layout */}
      <View style={Styles.row}>
        <Button title="C" isGray onPress={clear} />
        <Button
          title="+/-"
          isGray
          onPress={() => handleOperationPress("+/-")}
        />
        <Button title="％" isGray onPress={() => handleOperationPress("％")} />
        <Button title="÷" isBlue onPress={() => handleOperationPress("/")} />
      </View>
      <View style={Styles.row}>
        <Button title="7" onPress={() => handleNumberPress("7")} />
        <Button title="8" onPress={() => handleNumberPress("8")} />
        <Button title="9" onPress={() => handleNumberPress("9")} />
        <Button title="×" isBlue onPress={() => handleOperationPress("*")} />
      </View>
      <View style={Styles.row}>
        <Button title="4" onPress={() => handleNumberPress("4")} />
        <Button title="5" onPress={() => handleNumberPress("5")} />
        <Button title="6" onPress={() => handleNumberPress("6")} />
        <Button title="-" isBlue onPress={() => handleOperationPress("-")} />
      </View>
      <View style={Styles.row}>
        <Button title="1" onPress={() => handleNumberPress("1")} />
        <Button title="2" onPress={() => handleNumberPress("2")} />
        <Button title="3" onPress={() => handleNumberPress("3")} />
        <Button title="+" isBlue onPress={() => handleOperationPress("+")} />
      </View>
      <View style={Styles.row}>
        <Button title="." onPress={() => handleOperationPress(".")} />
        <Button title="0" onPress={() => handleNumberPress("0")} />
        <Button title="⌫" onPress={() => handleOperationPress("⌫")} />
        <Button title="=" isBlue onPress={() =>{if(!expression.endsWith("=")) getResult()}} /> 
      </View>
    </View>
  );
}