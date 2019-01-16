import Expo from 'expo';
import React from 'react';
import { Scene, Router, Stack } from 'react-native-router-flux';
import SignInComponent from './components/login/index';
import ListUsersComponent from './components/home/listUsers/index';
import NewUserComponent from './components/home/newUser/index';
import MenuInfoUserComponent from './components/userGithub/index';

export default class RouterComponent extends React.Component {
    render() {
        const { auth } = this.props;
        return (
        <Router>
          <Stack key="root">
            <Scene key="login" component={SignInComponent} initial={!auth} hideNavBar />
            <Scene key="users" component={ListUsersComponent} initial={auth} hideNavBar />
            <Scene key="newUser" component={NewUserComponent} hideNavBar />
            <Scene key="infoUser" component={MenuInfoUserComponent} hideNavBar />
          </Stack>
        </Router>
        );
    }
}

Expo.registerRootComponent(RouterComponent);
