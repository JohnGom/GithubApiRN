import React from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Keyboard
} from 'react-native';
import { Icon, Container, Toast } from 'native-base';
import { UpdateInfoAction, SignInAction } from '../../actions/index';
import styles from './styles';

class SignInComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showToast: false,
      isSignInLoading: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.handleSignInLoadingState(nextProps.signInResult);
  }

  onPressLogIn = () => {
    Keyboard.dismiss();
    const { username, password } = this.props;
    if (username === '') {
      Toast.show({
        text: 'Introduce un usuario',
        buttonText: 'Ok',
        type: 'danger',
      });
    } else if (password === '') {
      Toast.show({
        text: 'Introduce una contraseña',
        buttonText: 'Ok',
        type: 'danger',
      });
    } else {
      this.handleSignInLoadingState(true);
      this.props.SignInAction({ username, password });
    }
  }

  handleSignInLoading(isLoading) {
    if (isLoading) {
      return (
        <ActivityIndicator size='large' color='#25292E' />
      );
    }
  }

  handleSignInLoadingState(state) {
    this.setState({ isSignInLoading: state });
  }

  render() {
    return (
      <Container style={StyleSheet.flatten(styles.viewContainer)}>
        <Icon
          name='people'
          style={StyleSheet.flatten(styles.iconLogo)}
        />
        <View style={StyleSheet.flatten(styles.viewForm)}>
          <View style={StyleSheet.flatten(styles.textInputView)}>
            <Icon
              name='md-person'
              style={StyleSheet.flatten(styles.icon)}
            />
            <TextInput
              ref='busqueda'
              placeholder="Usuario"
              placeholderTextColor="#00000060"
              underlineColorAndroid='transparent'
              value={this.props.username}
              onChangeText={(value) => this.props.UpdateInfoAction({ prop: 'username', value })}
              style={StyleSheet.flatten(styles.textInput)}
            />
          </View>
          <View style={StyleSheet.flatten(styles.textInputView)}>
            <Icon
              name='md-lock'
              style={StyleSheet.flatten(styles.icon)}
            />
            <TextInput
              ref='busqueda'
              placeholder="Contraseña"
              placeholderTextColor="#00000060"
              secureTextEntry
              underlineColorAndroid='transparent'
              value={this.props.password}
              onChangeText={(value) => this.props.UpdateInfoAction({ prop: 'password', value })}
              style={StyleSheet.flatten(styles.textInput)}
            />
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={this.onPressLogIn}
            style={StyleSheet.flatten(styles.btnLogin)}
          >
            <Text style={StyleSheet.flatten(styles.textBtnLogin)}>
              INICIAR SESIÓN
            </Text>
          </TouchableOpacity>
        </View>
        {this.handleSignInLoading(this.state.isSignInLoading)}
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
    const { username, password, signInResult } = state.user;
    return { username, password, signInResult };
};

export default connect(mapStateToProps,
{ UpdateInfoAction, SignInAction })(SignInComponent);
