import React from 'react';
import DatePicker from 'react-native-datepicker';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { StyleSheet, View, TextInput } from 'react-native';
import {
  Container,
  Header,
  Right,
  Body,
  Left,
  Icon,
  Content,
  Text,
  Button,
  Toast
} from 'native-base';
import { UpdateInfoAction, newUserAction, clearInputsAction } from '../../../actions/index';
import styles from './styles';

const customStyles = {
  dateIcon: {

  },
  dateInput: {
    flex: 1,
    borderWidth: 0,
  },
  dateText: {
    paddingLeft: 5,
    color: 'black',
    alignSelf: 'flex-start',
  }
};

class NewUserComponent extends React.Component {

  componentWillUnmount() {
    this.props.clearInputsAction();
  }

  saveNewUser = () => {
    const { name, lastname, email, identification, birthdate, userGithub } = this.props;
    const emailValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
    const idValid = /^([0-9])*$/;
    if (name === '' || lastname === '' || email === '' ||
    identification === '' || birthdate === '' || userGithub === '') {
      Toast.show({
        text: 'Debes llenar todos los campos',
        buttonText: 'Ok',
        type: 'danger',
      });
    } else if (!emailValid.test(email)) {
      Toast.show({
        text: 'El correo no es valido',
        buttonText: 'Ok',
        type: 'danger',
      });
    } else if (!idValid.test(identification)) {
      Toast.show({
        text: 'El numero de identificación deben ser dígitos numéricos',
        buttonText: 'Ok',
        type: 'danger',
      });
    } else {
      const URL = `https://api.github.com/users/${userGithub}`;
      fetch(`${URL}`)
      .then(response => response.json())
      .then(data => {
        if (data.message && data.message === 'Not Found') {
          Toast.show({
            text: 'El usuario de GitHub no existe',
            buttonText: 'Ok',
            type: 'danger',
          });
        } else {
          this.props.newUserAction({
            name,
            lastname,
            email,
            identification,
            birthdate,
            userGithub,
            avatarUrl: data.avatar_url,
            url: data.html_url,
            repos: data.public_repos
          });
        }
      });
    }
  }

  render() {
    return (
      <Container style={StyleSheet.flatten(styles.viewContainer)}>
        <Header
          noShadow
          androidStatusBarColor={'#25292E'}
          style={StyleSheet.flatten(styles.viewHeader)}
        >
          <Left>
            <Button transparent onPress={() => Actions.pop()}>
              <Icon name="ios-arrow-back" />
            </Button>
          </Left>
          <Body>
            <Text style={StyleSheet.flatten(styles.textTitle)}>
              Crear nuevo usuario
            </Text>
          </Body>
          <Right>
            <Button transparent onPress={this.saveNewUser}>
              <Text style={StyleSheet.flatten(styles.textTitle)}>
                Crear
              </Text>
            </Button>
          </Right>
        </Header>
        <Content>
          <View style={StyleSheet.flatten(styles.textInputView)}>
            <Icon
              name='md-person'
              style={StyleSheet.flatten(styles.icon)}
            />
            <TextInput
              ref='name'
              returnKeyType='done'
              placeholder='Nombres'
              placeholderTextColor='#00000060'
              underlineColorAndroid='transparent'
              value={this.props.name}
              onChangeText={value => this.props.UpdateInfoAction({ prop: 'name', value })}
              style={StyleSheet.flatten(styles.textInput)}
            />
          </View>
          <View style={StyleSheet.flatten(styles.textInputView)}>
            <Icon
              name='md-person'
              style={StyleSheet.flatten(styles.icon)}
            />
            <TextInput
              ref='lastname'
              returnKeyType="done"
              placeholder='Apellidos'
              placeholderTextColor='#00000060'
              underlineColorAndroid='transparent'
              value={this.props.lastname}
              onChangeText={value => this.props.UpdateInfoAction({ prop: 'lastname', value })}
              style={StyleSheet.flatten(styles.textInput)}
            />
          </View>
          <View style={StyleSheet.flatten(styles.textInputView)}>
            <Icon
              name='finger-print'
              style={StyleSheet.flatten(styles.icon)}
            />
            <TextInput
              ref='identification'
              returnKeyType="done"
              keyboardType="numeric"
              placeholder='Número de identificación'
              placeholderTextColor='#00000060'
              underlineColorAndroid='transparent'
              value={this.props.identification}
              onChangeText={value => this.props.UpdateInfoAction({ prop: 'identification', value })}
              style={StyleSheet.flatten(styles.textInput)}
            />
          </View>
          <View style={StyleSheet.flatten(styles.textInputView)}>
              <Icon
                name='calendar'
                style={StyleSheet.flatten(styles.icon)}
              />
              <DatePicker
                showIcon={false}
                format="YYYY-MM-DD"
                minDate="1900-01-01"
                maxDate="2017-12-31"
                placeholder="Fecha de Nacimiento"
                mode="date"
                confirmBtnText={'Hecho'}
                cancelBtnText={'Cancelar'}
                customStyles={customStyles}
                date={this.props.birthdate}
                onDateChange={value => this.props.UpdateInfoAction({ prop: 'birthdate', value })}
                style={StyleSheet.flatten(styles.dateInput)}
              />
          </View>
          <View style={StyleSheet.flatten(styles.textInputView)}>
            <Icon
              name='mail'
              style={StyleSheet.flatten(styles.icon)}
            />
            <TextInput
              ref='email'
              returnKeyType="done"
              keyboardType="email-address"
              placeholder='Correo electrónico'
              placeholderTextColor='#00000060'
              underlineColorAndroid='transparent'
              value={this.props.email}
              onChangeText={value => this.props.UpdateInfoAction({ prop: 'email', value })}
              style={StyleSheet.flatten(styles.textInput)}
            />
          </View>
          <View style={StyleSheet.flatten(styles.textInputView)}>
            <Icon
              name='logo-github'
              style={StyleSheet.flatten(styles.icon)}
            />
            <TextInput
              ref='userGithub'
              returnKeyType="done"
              placeholder='Usuario github'
              placeholderTextColor='#00000060'
              underlineColorAndroid='transparent'
              value={this.props.userGithub}
              onChangeText={value => this.props.UpdateInfoAction({ prop: 'userGithub', value })}
              style={StyleSheet.flatten(styles.textInput)}
            />
          </View>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
const { name, lastname, email, identification, birthdate, userGithub } = state.user;

 return { name, lastname, email, identification, birthdate, userGithub };
};

export default connect(mapStateToProps,
  { UpdateInfoAction, newUserAction, clearInputsAction })(NewUserComponent);
