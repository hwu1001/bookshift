import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, SectionList, ActivityIndicator } from 'react-native';
import SectionHeader from '../components/SectionHeader';
import { Colors } from 'react-native/Libraries/NewAppScreen';

interface IShift {
  id: string,
  area: string,
  booked: boolean,
  startTime: number,
  endTime: number
}

// Will eventually need a pqueue instead of an array
// Maybe this? https://github.com/mourner/tinyqueue
interface IShiftMap { [s: string]: IShift[] }

const AvailableShifts: React.FC = () => {
  let [shiftData, setShiftData] = useState<IShiftMap>({});
  let [dates, setDates] = useState<string[]>([]);
  let [refreshing, setRefreshing] = useState(true);
  useEffect(() => {
    let didCancel = false;
  
    // Starting with this: https://github.com/facebook/react/issues/14326#issuecomment-472043812
    async function fetchMyAPI() {
      let url = 'http://127.0.0.1:8080/shifts';
      try {
        const response = await fetch(url);
        const json = await response.json(); 
        if (!didCancel) { // Ignore if we started fetching something else
          let shiftsCopy: IShiftMap = {};
          let datesCopy: string[] = [];
          const todayDateStr = _getFullDateStr(new Date());

          // const groupByDay = (value: IShift) => {
          //   let start = new Date(value.startTime);
          //   let d = _getDateKey(start);
          //   shiftsCopy[d] = shiftsCopy[d] || [];
          //   shiftsCopy[d].push(value);
          //   datesCopy.push(d);
          // };
          // json.map(groupByDay);
          
          for (const shift of json) {
            const dateKey = _getFullDateStr(new Date(shift.startTime));
            // If the date on the shift is before today then there's nothing the user
            // can do with the shift, so don't display it
            if (dateKey < todayDateStr) {
              continue;
            }
            if (shiftsCopy.hasOwnProperty(dateKey)) {
              shiftsCopy[dateKey].push(shift);
            } else {
              shiftsCopy[dateKey] = [shift];
              datesCopy.push(dateKey);
            }
          }
          datesCopy.sort();
          setDates(datesCopy);
          setShiftData(shiftsCopy);
          setRefreshing(false);
        }
      } catch (error) {
        console.warn(error);
      }
      
    }  
  
    fetchMyAPI();
    return () => { didCancel = true; }; // Remember if we start fetching something else
  }, []);

  const _getFullDateStr = (d: Date) => {
    return d.getMonth().toString() + d.getDay().toString() + d.getFullYear().toString();
  };

  const _createSections = () => {
    let sections = [];
    for (const date of dates) {
      sections.push({
        title: _dateTitle(new Date(shiftData[date][0].startTime)),
        data: shiftData[date]
      });
    }
    return sections;
  };

  const isSameDay = (d1: Date, d2: Date): boolean => {
    return d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate();
  }

  const _dateTitle = (d: Date): string => {
    const today = new Date();
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    let ret = '';
    if (isSameDay(today, d)) {
      ret = 'Today';
    } else if (isSameDay(tomorrow, d)) {
      ret = 'Tomorrow';
    } else {
      ret = d.toLocaleDateString('en-US', { month: 'long', day: '2-digit' });
    }
    return ret;
  };
  // TODO: Need to set background color to the section header
  // https://github.com/saleel/react-native-super-grid/issues/60#issuecomment-417782829

  return (
    <SafeAreaView style={styles.body}>
      {refreshing ? <ActivityIndicator size="large" color="#0000ff" />
      : <SectionList
        renderItem={({item}) => <Text key={item.id}>{`Area: ${item.area} ID: ${item.id} Booked?: ${item.booked}`}</Text>}
        renderSectionHeader={({section: {title}}) => (
          <SectionHeader title={title} numShifts={2} totalTime={4}/>
        )}
        sections={_createSections()}
        keyExtractor={(item) => item.id}
      />
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
    flex: 1
  },
  sectionContainer: {
    marginTop: 32
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default AvailableShifts;