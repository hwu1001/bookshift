import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

// Based in part off of https://react-native-training.github.io/react-native-elements/docs/button.html
export interface IPillButton {
  text: string,
  type: 'positive' | 'negative' | 'inactive'
}

const PillButton: React.FC<IPillButton> = (props: IPillButton) => {
  const { text, type } = props;

  const _pressCb = () => {
    console.warn('pill button pressed');
  };

  return(
    <View style={styles.container}>
      <TouchableOpacity style={StyleSheet.flatten([styles.button, _getStyleType(type, 'button')])} disabled={type === 'inactive'} onPress={_pressCb}>
        <Text style={StyleSheet.flatten([styles.text, _getStyleType(type, 'text')])}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

const _getStyleType = (type: IPillButton['type'], element: 'button' | 'text') => {
  switch (type) {
    case 'positive':
      return element === 'text' ? styles.positiveText : styles.positiveButton;
    case 'negative':
      return element === 'text' ? styles.negativeText : styles.negativeButton;
    case 'inactive':
      return element === 'text' ? styles.inactiveText : styles.inactiveButton;
    default:
      break;
  }
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 3,
    // flexDirection: 'row',
    // backgroundColor: '#ffffff',
    // borderColor: '#CBD2E1'
  },
  button: {
    borderWidth: 1,
    borderRadius: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    backgroundColor: 'transparent'

  },
  text: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    textAlign: 'center',
    paddingTop: 2,
    paddingBottom: 1,
    paddingHorizontal: '15%'
  },
  positiveText: {
    color: '#16A64D'
  },
  negativeText: {
    color: '#E2006A'
  },
  positiveButton: {
    borderColor: '#55CB82',
  },
  negativeButton: {
    borderColor: '#FE93B3',
  },
  inactiveText: {
    color: '#A4B8D3'
  },
  inactiveButton: {
    borderColor: '#CBD2E1'
  }
});

export default PillButton;