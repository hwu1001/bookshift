import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface IAreaFilterItem {
  area: string,
  orderCounter: number,
  filterCb: (area: string) => void
}

const AreaFilterItem: React.FC<IAreaFilterItem> = (props: IAreaFilterItem) => {
  const { area, orderCounter, filterCb } = props;
  const _onFilterPress = () => {
    filterCb(area);
  };
  return (
    <View style={styles.view}>
      <TouchableOpacity onPress={_onFilterPress}>
        <Text style={styles.areaText}>{`${area} (${orderCounter.toString()})`}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row', 
    alignSelf: 'flex-start',
    paddingVertical: '7%',
    paddingRight: '4%',
    paddingLeft: '4%'
  },
  areaText: {
    color: '#004FB4',
    fontFamily: 'Inter-SemiBold',
    fontSize: 17,
    // fontWeight: '800',
    // paddingHorizontal: '5%'
    // paddingTop: '5%',
    // paddingBottom: '5%'
  }
});

export default AreaFilterItem;