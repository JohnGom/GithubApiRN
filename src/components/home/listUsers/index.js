import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { FlatList, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Container, Header, Body, Right, Icon, Button } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { UsersFetchAction } from '../../../actions/index';
import ItemUserComponent from './itemUser/index';
import styles from './styles';

class ListUsersComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isEmpty: true,
    };
  }

  componentWillMount() {
    this.handleEmptyState(this.props.validate);
  }

  componentDidMount() {
    this.props.UsersFetchAction();
  }

  componentWillReceiveProps(nextProps) {
    this.handleEmptyState(nextProps.validate);
  }

  handleEmptyState(result) {
    this.setState({ isEmpty: result });
  }

  render() {
    return (
      <Container style={StyleSheet.flatten(styles.viewContainer)}>
        <Header
          noShadow
          noLeft
          androidStatusBarColor={'#25292E'}
          style={StyleSheet.flatten(styles.viewHeader)}
        >
          <Body>
            <Text style={StyleSheet.flatten(styles.textTitle)}>
              Lista de usuarios
            </Text>
          </Body>
          <Right>
            <Button transparent onPress={() => Actions.newUser()}>
              <Icon name="person-add" />
            </Button>
          </Right>
        </Header>
        {this.state.isEmpty ?
          <View style={StyleSheet.flatten(styles.viewEmptyResult)}>
            <Icon
              name="md-people"
              style={StyleSheet.flatten(styles.iconEmpty)}
            />
            <Text style={StyleSheet.flatten(styles.textTitleEmpty)}>
              Aún no hay usuarios creados
            </Text>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => Actions.newUser()}
              style={StyleSheet.flatten(styles.btnNewUser)}
            >
              <Text style={StyleSheet.flatten(styles.textTitle)}>
                Crear nuevo usuario
              </Text>
            </TouchableOpacity>
          </View>
        :
          null
        }
        <FlatList
         data={this.props.users}
         renderItem={({ item }) => <ItemUserComponent user={item} />}
         keyExtractor={item => item.userGithub}
        />
      </Container>
    );
  }
}

const mapStateToProps = state => {
  const users = _.map(state.user.listUsers, (church) => {
    return { ...church };
  });
  const validate = state.user.validate;
  return { users, validate };
};

export default connect(mapStateToProps,
  { UsersFetchAction })(ListUsersComponent);
