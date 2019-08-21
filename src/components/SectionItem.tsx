import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface ISectionItem {
  startHour: string,
  endHour: string,
  area?: string,
  shiftStatus?: string,
  buttonComponent?: React.FC
}

const SectionItem: React.FC<ISectionItem> = (props: ISectionItem) => {
  const { startHour, endHour, area } = props;
  return (
    <View style={styles.sectionView}>
      <View style={styles.viewContainer}>
        <Text style={styles.hourText}>{`${startHour}:00-${endHour}:00`}</Text>
        <Text style={styles.areaText}>{area}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionView: {
    flexDirection: 'row',
    backgroundColor: '#F7F8FB',
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: '#CBD2E1'
  },
  viewContainer: {
    justifyContent: 'center',
    paddingVertical: 10,
    marginLeft: '5%',
    marginRight: '5%'
    
  },
  hourText: {
    color: '#4F6C92',
    fontFamily: 'Inter-Medium',
    fontSize: 16
  },
  areaText: {
    color: '#A4B8D3',
    fontFamily: 'Inter-Regular',
    fontSize: 16
  }
});

export default SectionItem;