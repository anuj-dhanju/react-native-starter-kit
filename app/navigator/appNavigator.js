import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';

import Start from '../components/start'
import Login from '../components/login'
import Home from '../components/home'
import Convo from '../components/convo'
import Gallery from '../components/gallery'
import ConvoTrans from '../components/convoTrans'
import Tweets from '../components/tweets'
import Discover from '../components/discover'
import Visualize from '../components/visualize'
import Pinned from '../components/pinned'
import Profile from '../components/profile'
import Chat from '../components/chat'

export var AppNavigator = StackNavigator({
  Start: { screen: Start },
  Login: { screen: Login },
  Home: { screen: Home },
  Convo: { screen: Convo },
  Gallery: { screen: Gallery },
  ConvoTrans: { screen: ConvoTrans },
  Login: { screen: Login },
  Tweets: { screen: Tweets },
  Discover: { screen: Discover },
  Visualize: { screen: Visualize },
  Pinned: { screen: Pinned },
  Profile: { screen: Profile },
  Chat: { screen: Chat },
}, {
  initialRouteName: Start,
});

const AppWithNavigationState = ({ dispatch, nav }) => (
  <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
);

AppWithNavigationState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  nav: state.nav,
});

export default connect(mapStateToProps)(AppWithNavigationState);
