'use strict';

var React = require('react-native');
var DialogAndroid = require('react-native-dialogs');

var BASE_URL = 'http://192.168.56.1:8080';

function _showDialog (title = '', content = '', positiveText = 'Ok', negativeText = null) {
  var dialog = new DialogAndroid();
  dialog.set({
    title: title,
    content: content,
    positiveText: positiveText
  });
  dialog.show();
}

var DataStore = {
  login: function(user) {
    var loginObj = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userEmail: user.email,
        password: user.password
      }),
      timeout: 100000
    };

    if (!this.validateEmail(user.email)) {
        return _showDialog(
          'Please enter a valid email address.'
        );
    }

    if (user.password.length < 6) {
        return _showDialog(
          'Password is invalid. Please try again.'
        );
    }

    fetch(BASE_URL + '/login-submit', loginObj)
    .then((response) => response.json())
    .then((responseData) => {
        _showDialog(
            'POST Response',
            'Response Body -> ' + JSON.stringify(responseData.message)
        );
    })
    .catch(error => {
      debugger;
      this.errorHandler();
    })
    .done();
  },

  validateEmail: function(email) {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  },

  errorHandler: function() {
    return _showDialog(
      'Error',
      'There seems to be an issue connecting to the network.'
    );
  }
};

module.exports = DataStore;
