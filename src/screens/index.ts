import { Navigation } from 'react-native-navigation';
import MyShifts from './MyShifts';
import AvailableShifts from './AvailableShifts';
import Screens from './Screens'

const registerScreens = () => {
  Navigation.registerComponent(Screens.MyShifts, () => MyShifts);
  Navigation.registerComponent(Screens.AvailableShifts, () => AvailableShifts);
  
};

export { registerScreens, Screens };