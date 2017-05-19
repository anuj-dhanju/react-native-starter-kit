import { addNavigationHelpers, StackNavigator, NavigationActions } from 'react-navigation';
import { AppNavigator } from '../navigator/appNavigator';

const firstAction = AppNavigator.router.getActionForPathAndParams('Start');
const tempNavState = AppNavigator.router.getStateForAction(firstAction);
const secondAction = AppNavigator.router.getActionForPathAndParams('Start');

const initialNavState = AppNavigator.router.getStateForAction(
  secondAction,
  tempNavState
);

export default function nav(state = initialNavState, action={}) {
  let nextState;
  switch (action.type) {
    case 'Start':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.back(),
        state
      );
      break;
    case 'Login':
      nextState = AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'Login' }),
        state
      );
      break;
    default:
      nextState = AppNavigator.router.getStateForAction(action, state);
      break;
  }

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
}