import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PillButton from './PillButton';

interface ISectionItem {
  startHour: string,
  endHour: string,
  area?: string,
  shiftStatus?: string,
  buttonComponent?: JSX.Element
}

const SectionItem: React.FC<ISectionItem> = (props: ISectionItem) => {
  const { startHour, endHour, area, buttonComponent } = props;
  return (
    <View style={styles.sectionView}>
      <View style={styles.viewContainer}>
        <Text style={styles.hourText}>{`${startHour}:00-${endHour}:00`}</Text>
        {area && <Text style={styles.areaText}>{area}</Text>}
      </View>
      {!!buttonComponent && 
        <View style={styles.buttonContainer}>
          {buttonComponent}
        </View>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  sectionView: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: '#CBD2E1',
    alignItems: 'center',
    paddingVertical: 7
  },
  viewContainer: {
    // justifyContent: 'center',
    marginLeft: '5%',
    // marginRight: '5%',
    flex: 1,
    flexDirection: 'row',
    alignContent: 'flex-start'
  },
  hourText: {
    color: '#4F6C92',
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    fontWeight: '500'
  },
  areaText: {
    color: '#A4B8D3',
    fontFamily: 'Inter-Regular',
    fontSize: 16
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginRight: '5%'
    // justifyContent: 'flex-end',
  }
});

export default SectionItem;