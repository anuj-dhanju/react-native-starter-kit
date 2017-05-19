import React, { Component } from 'react';

import { Provider } from 'react-redux';

import AppWithNavigationState from '../navigator/appNavigator';

import store from '../store/configureStore';
export default  class Index extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}
