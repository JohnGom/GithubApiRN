import React from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Keyboard } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, ActionSheet } from 'native-base';
import {
  getUserRepositoriesAction,
  filterFetchReposAction,
  closeSearchAction,
  orderByListAction
} from '../../actions/index';
import ReposUserComponent from './listRepos/index';
import InfoUserComponent from './infoUser/index';
import styles from './styles';

const listIndex = ['name', 'language', 'default_branch', 'description'];

class MenuInfoUserComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        tabActual: 1,
        searchInputText: '',
        iconClearVisible: false
    };
  }

  componentDidMount() {
      const { userGithub } = this.props.user;
      this.props.getUserRepositoriesAction(userGithub);
  }

  onPressIconClear() {
    this.setState({
      searchInputText: '',
      iconClearVisible: false
    });
    this.props.closeSearchAction();
    this.refs.search.blur();
    Keyboard.dismiss();
  }
  onButtonSearchPress() {
    this.props.filterFetchReposAction(this.state.searchInputText);
  }

  searchInputTextDidChange(text) {
    this.setState({
        searchInputText: text
    });
    if (text.length > 2) {
      this.props.filterFetchReposAction(text);
    }
    if (text.length > 0 && this.state.iconClearVisible === false) {
      this.setState({ iconClearVisible: true });
    }
    if (text.length < 1 && this.state.iconClearVisible === true) {
      this.setState({ iconClearVisible: false });
      this.props.closeSearchAction();
    }
  }

  orderList = () => {
    ActionSheet.show(
      {
        options: ['Nombre', 'Lenguaje', 'Branch por defecto', 'Descripción', 'Cancelar'],
        cancelButtonIndex: 4,
        destructiveButtonIndex: 4,
        title: 'Ordenar por:'
      },
      buttonIndex => {
        if (buttonIndex !== 4) {
          this.props.orderByListAction(listIndex[buttonIndex]);
        }
      }
    );
  }

  changeTab(num) {
    this.setState({ tabActual: num });
  }

  render() {
    const { tabActual } = this.state;
    return (
      <Container>
        <Header
          searchBar
          rounded
          noShadow
          androidStatusBarColor={'#25292E'}
          style={StyleSheet.flatten(styles.viewHeader)}
        >
          <Left style={StyleSheet.flatten(styles.viewLeft)}>
            <Button transparent onPress={() => Actions.pop()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body style={StyleSheet.flatten(styles.viewBody)}>
            <Button
              onPress={() => this.changeTab(1)}
              style={StyleSheet.flatten(
                tabActual === 1 ? styles.btnSegmentActive : styles.btnSegmentInactive
              )}
            >
              <Text
                style={StyleSheet.flatten(
                  tabActual === 1 ? styles.textSegmentActive : styles.textSegment
                )}
              >
                Informacion
              </Text>
            </Button>
            <Button
              onPress={() => this.changeTab(2)}
              style={StyleSheet.flatten(
                tabActual === 2 ? styles.btnSegmentActive : styles.btnSegmentInactive
              )}
            >
              <Text
                style={StyleSheet.flatten(
                  tabActual === 2 ? styles.textSegmentActive : styles.textSegment
                )}
              >
                Repositorios
              </Text>
            </Button>
          </Body>
          <Right style={StyleSheet.flatten(styles.viewRight)}>
            {tabActual === 2 ?
                <Button transparent onPress={this.orderList}>
                  <Icon name="funnel" />
                </Button>
              :
                null
            }
          </Right>
        </Header>
        {tabActual === 1 ?
            <InfoUserComponent user={this.props.user} />
          :
            <View style={StyleSheet.flatten(styles.viewContent)}>
                <View style={StyleSheet.flatten(styles.viewSearch)}>
                  <Icon name='ios-search' style={StyleSheet.flatten(styles.iconSearch)} />
                  <TextInput
                    ref='search'
                    placeholder="Buscar Repositorios"
                    returnKeyType="search"
                    underlineColorAndroid='transparent'
                    onSubmitEditing={this.onButtonSearchPress.bind(this)}
                    onChangeText={(text) => this.searchInputTextDidChange(text)}
                    value={this.state.searchInputText}
                    style={StyleSheet.flatten(styles.textInputSearch)}
                  />
                  {this.state.iconClearVisible ?
                      <TouchableOpacity onPress={this.onPressIconClear.bind(this)}>
                        <Icon
                          ios='ios-close-circle'
                          android='md-close-circle'
                        />
                      </TouchableOpacity>
                    :
                      null
                  }
                </View>
              <ReposUserComponent />
            </View>
        }
      </Container>
    );
  }
}
const mapStateToProps = () => {
    return { };
  };

  export default connect(mapStateToProps,
  { getUserRepositoriesAction,
    filterFetchReposAction,
    closeSearchAction,
    orderByListAction
  })(MenuInfoUserComponent);
