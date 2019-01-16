import React, { Component } from 'react';
import { ListItem, Thumbnail, Left, Body, Right, Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { StyleSheet, Text } from 'react-native';
import styles from './styles';

class ItemUserComponent extends Component {

  render() {
    const { avatarUrl, name, lastname, userGithub } = this.props.user;
    return (
      <ListItem
        avatar
        onPress={() => { Actions.infoUser({ user: this.props.user }); }}
      >
        <Left>
          <Thumbnail source={{ uri: avatarUrl }} />
        </Left>
        <Body>
          <Text style={StyleSheet.flatten(styles.textName)}>
            {name} {lastname}
          </Text>
          <Text style={StyleSheet.flatten(styles.textNickName)}>
            {userGithub}
          </Text>
        </Body>
        <Right style={StyleSheet.flatten(styles.viewRight)}>
          <Icon
            name="ios-arrow-forward"
            style={StyleSheet.flatten(styles.iconDatail)}
          />
        </Right>
      </ListItem>
    );
  }
}

export default ItemUserComponent;
