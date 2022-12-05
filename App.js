import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Camera, CameraType } from "expo-camera";
import {
  StyleSheet,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Geolocation from "@react-native-community/geolocation";

export default function App() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState(null);

  // need some custom code to handle web browser permission stuff vs. native app

  useEffect(() => {
    Geolocation.getCurrentPosition((info) => {
      setLocation(info.coords);
    });
  }, []);

  const [type, setType] = useState(CameraType.front);

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

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
        <Camera style={styles.camera} type={type}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
              <Text style={styles.text}>Flip Camera</Text>
            </TouchableOpacity>
          </View>
        </Camera>
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

  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
