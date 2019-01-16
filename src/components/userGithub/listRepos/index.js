import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { Container, Icon, Content } from 'native-base';
import ItemRepoComponent from './itemRepo/index';
import styles from './styles';

class ReposUserComponent extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        index: 0,
        pagedList: []
      };
  }

  componentDidMount() {
    if (this.props.repositories.length > 0) {
      const users = _.chunk(this.props.repositories, 5);
      this.setState({
        pagedList: users,
        index: 0
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.repositories.length !== this.props.repositories.length || nextProps.repositories !== this.props.repositories) {
      const users = _.chunk(nextProps.repositories, 5);
      this.setState({
        pagedList: users,
        index: 0
      });
    }
  }

  previousPage = () => {
    this.setState(prevState => ({
      index: prevState.index - 1,
    }));
  }

  nextPage = () => {
    this.setState(prevState => ({
      index: prevState.index + 1,
    }));
  }

  render() {
    const { pagedList, index } = this.state;
    const { repositories } = this.props;
    return (
      <Container>
          {pagedList.length > 0 ?
          <Content>
          <FlatList
            data={pagedList[index]}
            renderItem={({ item }) => <ItemRepoComponent repo={item} />}
            keyExtractor={item => item.node_id}
          />
          {repositories.length > 5 ?
          <View style={StyleSheet.flatten(styles.viewContainPagination)}>
            <TouchableOpacity
            disabled={index === 0}
            onPress={this.previousPage}
            style={StyleSheet.flatten(styles.btnPagination)}
            >
              <Icon active name="ios-arrow-back" />
            </TouchableOpacity>
            <Text style={StyleSheet.flatten(styles.textPag)} >
              {index + 1} / {pagedList.length}
            </Text>
            <TouchableOpacity
            disabled={index === pagedList.length - 1}
            onPress={this.nextPage}
            style={StyleSheet.flatten(styles.btnPagination)}
            >
              <Icon active name="ios-arrow-forward" />
            </TouchableOpacity>
          </View>
          : null
          }
          </Content>
          : null
          }

      </Container>
    );
  }
}
const mapStateToProps = (state) => {
    const repositories = state.github.listRepos;
    return { repositories };
};

export default connect(mapStateToProps,
{ })(ReposUserComponent);
