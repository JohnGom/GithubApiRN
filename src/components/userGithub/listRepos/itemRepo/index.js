import React, { Component } from 'react';
import { Text, Card, Left, Body, CardItem, Icon } from 'native-base';
import { StyleSheet, View } from 'react-native';
import styles from './styles';

class ItemRepoComponent extends Component {

  render() {
    const { name, git_url, description, default_branch, language } = this.props.repo;
    return (
        <Card>
            <CardItem>
                <Icon active name="logo-github" />
                <Text>{name}</Text>
            </CardItem>
            <View style={StyleSheet.flatten(styles.containerItems)}>
              <Text style={StyleSheet.flatten(styles.texttitleUrl)}>Url Git</Text>
              <Text note>{git_url}</Text>
            </View>
            {description ?
              <CardItem cardBody style={StyleSheet.flatten(styles.containerItems)}>
                <Text note>
                  <Text style={StyleSheet.flatten(styles.titleDescription)}>
                  Descripción:
                  </Text> {description}
                </Text>
              </CardItem> : null
            }
            <CardItem>
              <Left>
                <Icon active android="md-git-branch" ios="ios-git-branch" />
                <Text>{default_branch}</Text>
              </Left>
              {language ?
                <Body style={StyleSheet.flatten(styles.infoLanguage)}>
                  <Icon active android="md-code" ios="ios-code" />
                  <Text style={StyleSheet.flatten(styles.textLan)}>{language}</Text>
                </Body> : null
              }
            </CardItem>
        </Card>
    );
  }
}

export default ItemRepoComponent;
