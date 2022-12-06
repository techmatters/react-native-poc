import React, { useState, useEffect, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import { Camera, CameraType } from "expo-camera";
import {
  Button,
  Image,
  Platform,
  StyleSheet,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Geolocation from "@react-native-community/geolocation";

if (Platform.OS == "web") {
  // https://github.com/expo/expo/issues/19485
  const query = navigator.permissions.query;

  navigator.permissions.query = (permissionDesc) => {
    return query(permissionDesc).catch((e) => {
      const { name } = permissionDesc;

      if (name === "camera") {
        return new Promise((resolve, reject) => {
          const { constraints, peerIdentity } = permissionDesc;

          navigator.mediaDevices
            .getUserMedia({ video: constraints || true, peerIdentity })
            .then((stream) => resolve({ name, state: "granted", stream }))
            .catch((err) => {
              if (err.name === "PermissionDeniedError") {
                resolve({ name, state: "denied" });
              } else {
                reject(err);
              }
            });
        });
      }
    });
  };
  // another polyfill for Firefox :/
  MediaStreamTrack.prototype.getCapabilities = () => ({});
}

export default function App() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState(null);

  useEffect(() => {
    Geolocation.getCurrentPosition((info) => {
      setLocation(info.coords);
    });
  }, []);

  const [type, setType] = useState(CameraType.front);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [cameraReady, setCameraReady] = useState(false);
  const cameraRef = useRef(null);
  const [imageProps, setImageProps] = useState(null);

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  function takePicture() {
    if (!cameraReady || !cameraRef) {
      return null;
    }
    cameraRef.current.takePictureAsync().then(({ uri, width, height }) => {
      setImageProps({ dataUri: uri, width, height });
      console.debug(uri, width, height);
    });
  }

  return (
    <View style={styles.container}>
      <Text>Please input the scene name</Text>
      <TextInput style={styles.nameInput} value={name} onChangeText={setName} />
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
      <Camera
        style={styles.camera}
        type={type}
        onCameraReady={() => setCameraReady(true)}
        ref={cameraRef}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
        </View>
      </Camera>
      <Button onPress={takePicture} title="Take Picture" />
      {imageProps && (
        <Image
          source={{
            uri: imageProps.dataUri,
            height: imageProps.height,
            width: imageProps.width,
          }}
        />
      )}
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
