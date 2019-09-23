import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

interface IPillButton {
  text: string
}

const PillButton: React.FC<IPillButton> = (props: IPillButton) => {
  const { text } = props;

  const _pressCb = () => {
    console.warn('pill button pressed');
  };

  return(
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={_pressCb}>
        <Text style={styles.text}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
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
    borderColor: '#55CB82',
    backgroundColor: 'transparent'

  },
  text: {
    color: '#16A64D',
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    textAlign: 'center',
    paddingTop: 2,
    paddingBottom: 1,
    paddingHorizontal: '15%'
  }
});

export default PillButton;