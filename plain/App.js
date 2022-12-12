/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState, useRef, useCallback} from 'react';
import type {Node} from 'react';
import {
  Button,
  Image,
  PermissionsAndroid,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {Camera, useCameraDevices} from 'react-native-vision-camera';

import Geolocation from '@react-native-community/geolocation';

const requestPermissions = async (permissionName, options) => {
  try {
    const granted = await PermissionsAndroid.request(permissionName, options);
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (err) {
    console.warn(err);
    return false;
  }
};

const requestLocationPermission = () =>
  requestPermissions(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
    title: 'Example App Location Permission',
    message: 'Cool Photo App needs access your location ',
    buttonNeutral: 'Ask Me Later',
    buttonNegative: 'Cancel',
    buttonPositive: 'OK',
  });

const requestCameraPermission = () =>
  requestPermissions(PermissionsAndroid.PERMISSIONS.CAMERA, {
    title: 'Example App Camera Permission',
    message: 'Cool Photo App needs to use your camera ',
    buttonNeutral: 'Ask Me Later',
    buttonNegative: 'Cancel',
    buttonPositive: 'OK',
  });

const CaptureButton = ({captureMedia}) => {
  return <Button title="Take Picture" onPress={captureMedia}></Button>;
};

/* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
 * LTI update could not be added via codemod */
const Section = ({children, title}): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [hasLocationPermission, setLocationPermission] = useState(false);
  const [hasCameraPermission, setCameraPermission] = useState(false);
  const [location, setLocation] = useState(null);
  const [photo, setPhoto] = useState(null);
  const camera = useRef();

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const devices = useCameraDevices('wide-angle-camera');
  const device = devices.back;

  const captureMedia = useCallback(
    args => {
      camera.current
        .takePhoto()
        .then(setPhoto)
        .then(() => console.debug(photo.path));
    },
    [camera],
  );

  useEffect(() => {
    requestLocationPermission().then(granted => {
      setLocationPermission(granted);
      if (!granted) {
        return;
      }
      Geolocation.getCurrentPosition(info => setLocation(info.coords));
    });
    requestCameraPermission().then(setCameraPermission);
  }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          {hasLocationPermission && location ? (
            <Text>
              You are located at: {location.latitude}, {location.longitude}
            </Text>
          ) : (
            <Text>I don't know where you are located!</Text>
          )}
        </View>
        <View
          style={{
            height: 400,
          }}>
          {hasCameraPermission && device ? (
            <>
              <Camera
                style={StyleSheet.absoluteFill}
                device={device}
                isActive={true}
                ref={camera}
                photo={true}
              />
              <CaptureButton
                style={StyleSheet.capture}
                captureMedia={captureMedia}
              />
            </>
          ) : (
            <Text>No permissions to show camera</Text>
          )}
          {photo && (
            <Image
              source={{uri: 'file://' + photo.path}}
              style={{height: 200, width: 200}}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  capture: {
    height: 200,
    width: '100%',
  },
});

export default App;
