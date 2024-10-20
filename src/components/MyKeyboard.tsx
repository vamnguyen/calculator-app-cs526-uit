import * as React from "react";
import Button from "./Button";
import { View, Text, Alert } from "react-native";
import { Styles } from "../styles/GlobalStyles";
import { myColors } from "../styles/Colors";

export default function MyKeyboard() {
  const [expression, setExpression] = React.useState("");
  const [currentNumber, setCurrentNumber] = React.useState("0");
  const [result, setResult] = React.useState<string | null>(null);

  const handleNumberPress = (number: string) => {
    if (expression.length < 20) {
      setExpression(expression + number);
      result ?? setCurrentNumber(number);
    }
  };

  const handleOperationPress = (operation: string) => {
    if (operation === "+/-") {
      if (result) {
        setResult((prev) => (Number(prev) * -1).toString()); // Change the sign of the number
      }
      
    } 
    else if(operation==="%"){
      if(result){
        setResult((prev)=>(Number(prev)/100).toString());      
      }
      
    }
    else if (expression.endsWith("=")) {
      setExpression(result + " " + operation + " ");
    } else if (expression !== "") {
      setExpression(expression + " " + operation + " ");
    }
  };

  const clear = () => {
    setExpression("");
    setCurrentNumber("0");
    setResult(null);
  };

  const getResult = () => {
    setResult(eval(expression));
    setCurrentNumber("");
    // Display the complete expression with the equal sign
    
    setExpression(expression + " =");
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
        {expression.endsWith("=") ? displayExpression() : null}

        <Text style={[Styles.resultNumber, { color: myColors.result }]}>
          {/* Display the result */}
          {result ?? (
            <Text
              style={{
                fontSize: 50,
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
        <Button title="%" isGray onPress={() => handleOperationPress("%")} />
        <Button title="÷" isBlue onPress={() => handleOperationPress("/")} />
      </View>
      <View style={Styles.row}>
        <Button title="7" onPress={() => handleNumberPress("7")} />
        <Button title="8" onPress={() => handleNumberPress("8")} />
        <Button title="9" onPress={() => handleNumberPress("9")} />
        <Button title="x" isBlue onPress={() => handleOperationPress("*")} />
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
        <Button title="." onPress={() => handleNumberPress(".")} />
        <Button title="0" onPress={() => handleNumberPress("0")} />
        <Button
          title="⌫"
          onPress={() => setExpression(expression.slice(0, -1))}
        />
        <Button title="=" isBlue onPress={() =>{if(!expression.endsWith("=")) getResult()}} />
      </View>
    </View>
  );
}
