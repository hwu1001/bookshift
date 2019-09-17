import React from 'react';
import { Navigation } from 'react-native-navigation';
import MyShifts from './MyShifts';
// import AvailableShifts from './AvailableShifts';
import AvailableShiftsContainer, { AvailableShiftsContainerProps } from '../modules/availableShifts/availableShifts.container';
import Screens from './Screens'
import { Provider } from 'react-redux';
import { store } from '../store';

const registerScreens = () => {
  Navigation.registerComponent(Screens.MyShifts, () => MyShifts);
  Navigation.registerComponent(Screens.AvailableShifts, () => (props: AvailableShiftsContainerProps) =>(
    <Provider store={store}>
      <AvailableShiftsContainer {...props} />
    </Provider>
  ), () => AvailableShiftsContainer);
};

export { registerScreens, Screens };