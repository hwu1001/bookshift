import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface IAreaFilterItem {
  area: string,
  orderCounter: number,
  filterCb: (area: string) => void,
  active: boolean
}

const AreaFilterItem: React.FC<IAreaFilterItem> = (props: IAreaFilterItem) => {
  const { area, orderCounter, filterCb, active } = props;
  const _onFilterPress = () => {
    filterCb(area);
  };

  const curTextStyle = active ? styles.areaTextActive : styles.areaTextInactive;
  return (
    <View style={styles.view}>
      <TouchableOpacity onPress={_onFilterPress}>
        <Text style={curTextStyle}>{`${area} (${orderCounter.toString()})`}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row', 
    alignSelf: 'center',
    paddingVertical: '15%',
    // paddingRight: '4%',
    paddingLeft: '5%'
  },
  areaTextActive: {
    color: '#004FB4',
    fontFamily: 'Inter-SemiBold',
    fontSize: 17,
    // fontWeight: '800',
    // paddingHorizontal: '5%'
    // paddingTop: '5%',
    // paddingBottom: '5%'
  },
  areaTextInactive: {
    color: '#CBD2E1',
    fontFamily: 'Inter-SemiBold',
    fontSize: 17,
  }
});

export default AreaFilterItem;