/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableNativeFeedback,
  Image
} = React;

var DialogAndroid = require('react-native-dialogs');

var WM_ReactNative_Android = React.createClass({
  getInitialState: function () {
    return {
      email: '',
      password: ''
    };
  },

  _onPressButton: function () {
    this._showDialog();
  },

  _showDialog: function () {
    var dialog = new DialogAndroid();
    dialog.set({
      title: 'You tried to log in',
      content: 'Yeap you did',
      positiveText: 'Ok'
    });
    dialog.show();
  },

  render: function() {
    let loginButton = null;
    if (this.state.email && this.state.password) {
      loginButton = <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple()} onPress={this._onPressButton}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </View>
      </TouchableNativeFeedback>
    } else {
      loginButton = <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple()} onPress={this._onPressButton}>
        <View style={[styles.button, { opacity: 0 }]}>
          <Text style={styles.buttonText}>Login</Text>
        </View>
      </TouchableNativeFeedback>
    }
    return (

      <View style={styles.container}>
        <View style={styles.backgroundImageWrapper}>
          <Image source={require('./android/app/img/welcome_background.png')} style={styles.backgroundImage} />
        </View>
        <View style={styles.loginForm}>
          <TextInput
            onChangeText={(text) => this.setState({email: !!text})}
            style={styles.input}
            type="email"
            placeholder="email"
            keyboardType="email-address"
          />
          <TextInput
            onChangeText={(text) => this.setState({password: !!text})}
            style={styles.input}
            placeholder="password"
            password={true}
          />
        </View>
        {loginButton}
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  loginForm: {
    marginTop: 100,
    backgroundColor: 'white'
  },
  backgroundImageWrapper: {
    flex: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  },
  backgroundImage: {
    flex: 1,
    alignSelf: 'center',
    resizeMode: 'contain'
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1
  },
  button: {
    backgroundColor: 'orange',
    padding: 10
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold'
  }
});

AppRegistry.registerComponent('WM_ReactNative_Android', () => WM_ReactNative_Android);
