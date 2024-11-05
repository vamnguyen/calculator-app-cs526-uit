
import React from "react";
import { View, Text, StyleSheet,FlatList,TouchableOpacity } from "react-native";
import { useHistory } from '../context/HistoryContext';


const HistoryScreen = () => {
  const { listHistory } = useHistory();
  
  return (
    <View style={styles.container}>
      {listHistory.length === 0 ? (
        <Text style={styles.text}>List of History is empty.</Text>
      ) : (
        <FlatList
        data={listHistory.slice().reverse()}
          keyExtractor={(item, index) => index.toString()} 
          renderItem={({ item }) => (
            <TouchableOpacity>
              <View>
                <Text style={styles.historyItem}>{item}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    paddingTop: 20
  },
  text: {
    fontSize: 20,
  },
  historyItem: {
    padding: 10,
    marginVertical: 5,
    textAlign: 'center',
    fontSize: 25,
    borderWidth: 1,
    borderColor:'black',
    marginHorizontal: 10
    
  }
});

export default HistoryScreen;
