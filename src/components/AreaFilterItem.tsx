import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface IAreaFilterItem {
  area: string,
  orderCounter: number,
  filterCb: () => void
}

const AreaFilterItem: React.FC<IAreaFilterItem> = (props: IAreaFilterItem) => {
  const { area, orderCounter, filterCb } = props;
  const _onFilterPress = () => {
    filterCb();
  };
  return (
    <TouchableOpacity onPress={_onFilterPress}>
      <Text style={styles.areaText}>{`${area} (${orderCounter.toString()})`}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  areaText: {
    color: '#004FB4',
    fontFamily: 'Inter-SemiBold',
    fontSize: 17,
    // fontWeight: '800',
    paddingVertical: '7%',
    paddingRight: '4%',
    paddingLeft: '4%'
    // paddingHorizontal: '5%'
    // paddingTop: '5%',
    // paddingBottom: '5%'
  }
});

export default AreaFilterItem;