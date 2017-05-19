/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Button,
  TextInput,
  Image,
  Dimensions,
  TouchableOpacity,
  View
} from 'react-native';
import { login } from '../actions/auth';


// import store from '../store/configureStore';


var {height, width} = Dimensions.get('window');

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '' };
  }

  
  submitLoginForm() {
    debugger;
    this.props.dispatch(login({login: this.state.email, password: this.state.password}));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user) {
      this.props.navigation.navigate('Home');
    }
  }


  render() {
    return (
      <Image style={styles.container} resizeMode="stretch" source={require('../images/party.jpg')}>
        <View style={{flex:2, margin: 20, justifyContent:'center'}}>
          <TextInput
            style={{ marginBottom: 10, height: 40, color: '#3aa7ff' }}
            keyBoardType="email-address"
            placeholder="Email"
            placeholderTextColor='#3aa7ff'
            onChangeText={(text) => this.setState({email: text})}
          />
          <TextInput
            style={{height: 40, marginBottom: 10, color: '#3aa7ff' }}
            secureTextEntry={true}
            placeholder="Password"
            placeholderTextColor='#3aa7ff'
            onChangeText={(text) => this.setState({password: text})}
          />
          <Button
            onPress={this.submitLoginForm.bind(this)}
            title="Login"
            color="#8dd7ff"
            styles={{padding: 5}} 
            accessibilityLabel="Learn more about this purple button"
          />
        </View>
      
      </Image>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height:null,
    width:null,

    backgroundColor: '#F5FCFF',
  },
  circle:{
    backgroundColor:'rgba(85,172,239,0.2)',
    height:60,
    width:60,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:30,

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
});

Login.contextTypes = {
  store: PropTypes.object.isRequired,
};

Login.propTypes = {
  user: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
}

Login.navigationOptions = {
  title: 'Login',
  header: null
};

function mapStateToProps(state) {
  const { auth } = state;
  if (auth) {
    return { user: auth.user, loginError: auth.loginError };
  }

  return { user: null };
}

export default connect(mapStateToProps)(Login);
