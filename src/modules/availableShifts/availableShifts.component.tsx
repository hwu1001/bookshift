import React from 'react';
import { SafeAreaView, StyleSheet, ActivityIndicator, FlatList, View } from 'react-native';
import AreaFilterItem from '../../components/AreaFilterItem';
import Shifts, { IShiftsProps } from '../core/shifts/Shifts.component';

export interface ICityCount {
  id: string,
  area: string,
  count: number,
  active: boolean
}

interface IAvailableShifts {
  loading: boolean,
  areaFilterProps: {
    data: ReadonlyArray<ICityCount>,
    filterCb: (area: string) => void
  },
  shiftListProps: IShiftsProps
}

const AvailableShifts: React.FC<IAvailableShifts> = (props: IAvailableShifts) => {
  const { loading, areaFilterProps, shiftListProps } = props;

  const _areaKeyExtractor = (item: ICityCount) => item.id;

  return (
    <SafeAreaView style={styles.body}>
      {loading ?
        <ActivityIndicator size="large" color="#0000ff" /> :
        <>
          <View style={styles.view}>
            <FlatList
              data={areaFilterProps.data}
              renderItem={({item}) => <AreaFilterItem area={item.area} orderCounter={item.count} filterCb={areaFilterProps.filterCb} active={item.active} />}
              horizontal={true}
              keyExtractor={_areaKeyExtractor}
              contentContainerStyle={styles.areaFilter}
            />
          </View>
          <Shifts
            sections={shiftListProps.sections}
          />
        </>
      }
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#ffffff',
    flex: 1
  },
  areaFilter: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  view: { // why does this work? Seems like a hack
    flex: 0
  }
});

export default AvailableShifts;