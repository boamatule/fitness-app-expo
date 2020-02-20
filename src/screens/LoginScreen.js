/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {Text, Icon, Input, Button, SocialIcon} from 'react-native-elements';
import firebase from "../components/Firebase";
import {Formik} from 'formik';
import * as Yup from 'yup';
// import {LoginManager, AccessToken} from 'react-native-fbsdk';
import * as Facebook from "expo-facebook";
import * as GoogleSignIn from 'expo-google-sign-in';
import Constants from "expo-constants";
// import { GoogleSignin } from '@react-native-community/google-signin';

export default class LoginScreen extends Component {
  static navigationOptions = {
    headerShown: false,
  };

  Login = (values, navigation) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(values.email, values.password)
      .then(response => {
        let {user} = response;
        this.setState({user});
        alert('Registration success');
        setTimeout(() => {
          navigation.navigate('HomeScreen');
        }, 2000);
      })
      .catch(err => {
        alert(err);
      });
  };

  signInWithFacebook = async () => {
    const appId = Constants.manifest.extra.facebook.appId;
    const permissions = ["public_profile", "email"];
    await Facebook.initializeAsync(appId);
    const { type, token } = Facebook.logInWithReadPermissionsAsync({
      permissions
    });
 
    if (type == "success") {
      await firebase.auth().setPersistence(firebase.auth. Auth.Persistence.LOCAL);
      const credential = firebase.auth.FacebookAuthProvider.credential(token);
      const facebookProfileData = await firebase
        .auth()
        .signInWithCredential(credential);
      console.log(facebookProfileData);
      setTimeout(() => {
        navigation.navigate('HomeScreen');
      }, 2000);
    }
  }


  signInWithGoogle = async () => {
    const appId = Constants.manifest.extra.google.appId;
    const permissions = ["public_profile", "email"];
    await GoogleSignin.signIn(appI);
    const { type, token } = Google.logInWithReadPermissionsAsync({
      permissions
    });
 
    if (type == "success") {
      await firebase.auth().setPersistence(firebase.auth. Auth.Persistence.LOCAL);
      const credential = firebase.auth.GoogleAuthProvider.credential(token);
      const googleProfileData = await firebase
        .auth()
        .signInWithCredential(credential);
      console.log(googleProfileData);
    }
  }
  

  // async FacebookLogin() {
  //   const result = await LoginManager.logInWithPermissions([
  //     'public_profile',
  //     'email',
  //   ]);

  //   if (result.isCancelled) {
  //     throw new Error('User cancelled the Login process');
  //   }
  //   const data = await AccessToken.getCurrentAccessToken();

  //   if (!data) {
  //     throw new Error('Something went wrong obtaining  access token');
  //   }
  //   const credential = firebase.auth.FacebookAuthProvider.credential(
  //     data.accessToken,
  //   );

  //   await firebase.auth().signInWithCredential(credential);
  //   alert('Registration success');
  //   setTimeout(() => {
  //     navigation.navigate('HomeScreen');
  //   }, 2000);
  // }

  // async signInWithGoogle() {
  //   try {
  //     // add any configuration settings here:
  //     await GoogleSignIn.configure();
  //     const data = await GoogleSignIn.signIn(); 
  //     // create a new firebase credential with the token
  //     const credential = firebase.auth.GoogleAuthProvider.credential(
  //       data.idToken,
  //       data.accessToken,
  //     );
  //     // login with credential
  //     const firebaseUserCredential = await firebase
  //       .auth()
  //       .signInWithCredential(credential);
  //     console.log(firebaseUserCredential.user.toJSON());
  //   } catch (e) {
  //     console.error(e);
  //   }
  // }

  render() {
    const LoginSchema = Yup.object().shape({
      email: Yup.string()
        .email('Invalid email')
        .required('Email is Required'),
      password: Yup.string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters'),
    });

    return (
      <KeyboardAvoidingView behavior={'padding'} enabled>
        <ScrollView
          style={StyleSheet.container}
          keyboardShouldPersistTaps="handled">
          <Formik
            initialValues={{email: '', password: ''}}
            onSubmit={(values, {setSubmitting}) => {
              this.Login(values, this.props.navigation);
              setSubmitting(false);
            }}
            validationSchema={LoginSchema}>
            {formikProps => (
              <React.Fragment>
                <View style={styles.headerContainer}>
                  <Icon
                    name="md-fitness"
                    size={80}
                    type="ionicon"
                    color={'#7265E2'}
                  />
                </View>
                <View style={styles.wrapper}>
                  <Input
                    leftIcon={
                      <Icon
                        name="email-outline"
                        type="material-community"
                        color="rgba(110, 120, 170, 1)"
                        size={25}
                      />
                    }
                    onChangeText={formikProps.handleChange('email')}
                    placeholder="Email"
                    inputContainerStyle={styles.input}
                    placeholderTextColor="grey"
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="email-address"
                    returnKeyType="next"
                  />
                  {formikProps.errors.email ? (
                    <Text style={{color: 'red'}}>
                      {formikProps.errors.email}
                    </Text>
                  ) : null}
                  <Input
                    leftIcon={
                      <Icon
                        name="lock"
                        type="simple-line-icon"
                        color="rgba(110, 120, 170, 1)"
                        size={25}
                      />
                    }
                    onChangeText={formikProps.handleChange('password')}
                    inputContainerStyle={styles.input}
                    placeholderTextColor="grey"
                    placeholder="Password"
                    autoCapitalize="none"
                    secureTextEntry={true}
                    autoCorrect={false}
                    keyboardType="default"
                    returnKeyType="next"
                  />
                  {formikProps.errors.password ? (
                    <Text style={{color: 'red'}}>
                      {formikProps.errors.password}
                    </Text>
                  ) : null}

                  <View style={styles.socialWrapper}>
                    <Text style={styles.signinwith}>Sign in with</Text>
                    <View style={styles.socialLogin}>
                      <TouchableOpacity onPress={() => this.signInWithFacebook()}>
                        <SocialIcon type="facebook" light />
                      </TouchableOpacity>

                      <TouchableOpacity onPress={() => this.signInWithGoogle()}>
                        <SocialIcon type="google" light />
                      </TouchableOpacity>

                      <TouchableOpacity onPress={() => this.signInWithTwitter()}>
                        <SocialIcon type="twitter" light />
                      </TouchableOpacity>
                    </View>

                    <Button
                      title="Login"
                      loading={false}
                      loadingProps={{size: 'small', color: 'white'}}
                      buttonStyle={{
                        backgroundColor: '#7265E3',
                        borderRadius: 15,
                      }}
                      titleStyle={{fontWeight: 'bold', fontSize: 23}}
                      containerStyle={{
                        marginVertical: 10,
                        height: 50,
                        width: 300,
                      }}
                      onPress={formikProps.handleSubmit}
                      disabled={!(formikProps.isValid && formikProps.dirty)}
                      underlayColor="transparent"
                    />
                  </View>
                </View>

                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('ForgotPasswordScreen')
                  }>
                  {/* onPress={() => this.FacebookLogin.FacebookLogin()}> */}
                  <Text h5 style={{textAlign: 'center', color: 'blue'}}>
                    Forgot Password?
                  </Text>
                </TouchableOpacity>
              </React.Fragment>
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F4F6FA',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    top: 30,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  input: {
    borderWidth: 1,
    borderColor: 'white',
    borderLeftWidth: 0,
    height: 50,
    backgroundColor: 'white',
    marginBottom: 20,
  },
  socialWrapper: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialLogin: {
    flexDirection: 'row',
    marginTop: 10,
  },
});
