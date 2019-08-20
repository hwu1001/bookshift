import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface ISectionHeader {
  title: string,
  numShifts?: number,
  totalTime?: number
}

const SectionHeader: React.FC<ISectionHeader> = (props: ISectionHeader) => {
  const { title, numShifts, totalTime } = props;
  const shift = (numShifts && numShifts > 1) ? 'shifts' : 'shift';
  return (
    <View style={styles.sectionView}>
      <Text style={styles.title}>{title}</Text>
      {numShifts &&
       totalTime &&
       <Text style={styles.shiftDuration}>{`${numShifts} ${shift}, ${totalTime} h`}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  sectionView: {
    flexDirection: 'row',
    backgroundColor: '#F1F4F8',
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: '#CBD2E1'
  },
  title: {
    color: '#4F6C92',
    fontFamily: 'Inter-Bold',
    paddingVertical: 10,
    marginLeft: '5%',
    marginRight: '5%',
    fontSize: 16
  },
  shiftDuration: {
    color: '#A4B8D3',
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    paddingVertical: 10,
  }
});

export default SectionHeader;