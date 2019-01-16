import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Image, Linking, TouchableOpacity } from 'react-native';
import { Container, Icon } from 'native-base';
import styles from './styles';

class InfoUserComponent extends React.Component {

  constructor(props) {
      super(props);
      this.state = {

      };
  }

  goLinkUrl = () => {

  }

  render() {
    const {
      name,
      lastname,
      email,
      identification,
      birthdate,
      userGithub,
      avatarUrl,
      url,
      repos
    } = this.props.user;

    return (
      <Container style={StyleSheet.flatten(styles.viewContainer)}>
        <View style={StyleSheet.flatten(styles.viewContentAvatar)}>
          <Image
            source={{ uri: avatarUrl }}
            style={StyleSheet.flatten(styles.imgAvatar)}
          />
          <Text style={StyleSheet.flatten(styles.textName)}>
            {name} {lastname}
          </Text>
          <Text style={StyleSheet.flatten(styles.textNick)}>
            {userGithub}
          </Text>
        </View>
        <View style={StyleSheet.flatten(styles.viewContentDescription)}>
          <View style={StyleSheet.flatten(styles.viewItemDescription)}>
            <View style={StyleSheet.flatten(styles.viewIconDescription)}>
              <Icon
                name='md-mail'
                style={StyleSheet.flatten(styles.iconDescription)}
              />
            </View>
            <Text style={StyleSheet.flatten(styles.textDescription)}>
              {email}
            </Text>
          </View>
          <View style={StyleSheet.flatten(styles.viewItemDescription)}>
            <View style={StyleSheet.flatten(styles.viewIconDescription)}>
              <Icon
                name='md-finger-print'
                style={StyleSheet.flatten(styles.iconDescription)}
              />
            </View>
            <Text style={StyleSheet.flatten(styles.textDescription)}>
              {identification}
            </Text>
          </View>
          <View style={StyleSheet.flatten(styles.viewItemDescription)}>
            <View style={StyleSheet.flatten(styles.viewIconDescription)}>
              <Icon
                name='md-calendar'
                style={StyleSheet.flatten(styles.iconDescription)}
              />
            </View>
            <Text style={StyleSheet.flatten(styles.textDescription)}>
              {birthdate}
            </Text>
          </View>
          <View style={StyleSheet.flatten(styles.viewItemDescription)}>
            <View style={StyleSheet.flatten(styles.viewIconDescription)}>
              <Icon
                name='logo-github'
                style={StyleSheet.flatten(styles.iconDescription)}
              />
            </View>
            <TouchableOpacity onPress={() => { Linking.openURL(url); }}>
            <Text style={StyleSheet.flatten(styles.textUrl)}>
              {url}
            </Text>
            </TouchableOpacity>
          </View>
          <View style={StyleSheet.flatten(styles.viewItemDescription)}>
            <View style={StyleSheet.flatten(styles.viewIconDescription)}>
              <Icon
                name='md-git-branch'
                style={StyleSheet.flatten(styles.iconDescription)}
              />
            </View>
            <Text style={StyleSheet.flatten(styles.textDescription)}>
              {repos}
            </Text>
          </View>
        </View>
      </Container>
    );
  }
}
const mapStateToProps = () => {
  return { };
};

export default connect(mapStateToProps,
{ })(InfoUserComponent);
