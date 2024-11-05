import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
// import { signIn } from './comps/signin';
import React from 'react';

GoogleSignin.configure({
  webClientId: "182037705565-uimv2l97570fppu5ief04lkd4crfan8s.apps.googleusercontent.com",
  scopes: ['https://www.googleapis.com/auth/drive.readonly'],
  offlineAccess: true, 
  forceCodeForRefreshToken: true, 
  iosClientId: '182037705565-mc79kjioqpdtmin37mh9ufcgs1t7mloq.apps.googleusercontent.com'
});

export default function App() {

  const login = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('userInfo:', userInfo);
      // Optionally handle user info (e.g., set state)
    } catch (error: any) {
      console.log('error', error);
      // Handle error properly
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.IN_PROGRESS:
            console.log('Sign-in is already in progress.');
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            console.log('Play services not available or outdated.');
            break;
          default:
            console.log('Some other error occurred.');
        }
      } else {
        console.log('An error unrelated to Google Sign-In occurred');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text>Login to bravo</Text>
      <GoogleSigninButton
      size={GoogleSigninButton.Size.Wide}
      color={GoogleSigninButton.Color.Dark}
      onPress={login}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
