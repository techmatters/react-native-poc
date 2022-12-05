import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TextInput, View } from "react-native";

export default function App() {
  const [name, setName] = useState("");
  return (
    <View style={styles.container}>
      <Text>Please input the scene name</Text>
      <TextInput style={styles.nameInput} value={name} onChangeText={setName} />
      {name && <Text>Scene {name}</Text>}
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
    boxSizing: "border-box",
  },
  nameInput: {
    margin: "10px",
    padding: "5px",
    border: "solid black 2px",
  },
});
