import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, ScrollView, Text, TextInput, View } from "react-native";
import Geolocation from "@react-native-community/geolocation";

export default function App() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState(null);

  useEffect(() => {
    Geolocation.getCurrentPosition((info) => {
      setLocation(info.coords);
    });
  }, []);

  return (
    <React.StrictMode>
      <View style={styles.container}>
        <Text>Please input the scene name</Text>
        <TextInput
          style={styles.nameInput}
          value={name}
          onChangeText={setName}
        />
        <View>
          {(name && (
            <Text>
              <p>Scene</p>
              <p>{name}</p>
            </Text>
          )) || <Text></Text>}
          {location ? (
            <Text>
              You are at: {location.latitude.toLocaleString()},{" "}
              {location.longitude.toLocaleString()}
            </Text>
          ) : (
            <Text>Fetching location...</Text>
          )}
        </View>
        <StatusBar style="auto" />
      </View>
    </React.StrictMode>
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
