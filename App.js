import Expo from 'expo';
import React from 'react';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import { Root } from 'native-base';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './src/reducers';
import config from './src/config/firebase';
import Router from './src/router';

const roboto = require('native-base/Fonts/Roboto.ttf');
const robotoMedium = require('native-base/Fonts/Roboto_medium.ttf');

const store = createStore(
  reducers,
  {},
  applyMiddleware(
    ReduxThunk
  ),
);

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      isReady: false,
      assetsLoaded: false,
      auth: false
    };
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: roboto,
      Roboto_medium: robotoMedium,
    });
    this.setState({ assetsLoaded: true });
  }

  componentDidMount() {
    firebase.initializeApp(config);
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ isReady: true, auth: true });
      } else {
        this.setState({ isReady: true, auth: false });
      }
    });
  }

  render() {
    if (!this.state.isReady || !this.state.assetsLoaded) {
      return <Expo.AppLoading />;
    }
    return (
      <Root>
        <Provider store={store}>
          <Router auth={this.state.auth} />
        </Provider>
      </Root>
    );
  }
}

export default App;
