import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, SectionList, ActivityIndicator, FlatList } from 'react-native';
import SectionHeader from '../components/SectionHeader';
import SectionItem from '../components/SectionItem';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import moment from 'moment';

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

interface ICityCount {
  id: string,
  area: string,
  count: number
}

interface ICityCountMap { [s: string]: ICityCount };

const AvailableShifts: React.FC = () => {
  let [shiftData, setShiftData] = useState<IShiftMap>({});
  let [cityOrderCount, setCityOrderCount] = useState<ICityCount[]>([]);
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
          let cityCopy: ICityCountMap = {};
          const todayDateStr = _getFullDateStr(new Date());
          // console.warn(`today: ${todayDateStr}`);

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
            // console.warn(`dateKey: ${dateKey}`);
            // If the date on the shift is before today then there's nothing the user
            // can do with the shift, so don't display it
            if (dateKey < todayDateStr) {
              continue;
            }

            if (!cityCopy.hasOwnProperty(shift.area)) {
              cityCopy[shift.area] = {
                id: shift.area,
                area: shift.area,
                count: 1
              };
            } else {
              cityCopy[shift.area].count += 1;
            }

            if (shiftsCopy.hasOwnProperty(dateKey)) {
              shiftsCopy[dateKey].push(shift);
            } else {
              shiftsCopy[dateKey] = [shift];
              datesCopy.push(dateKey);
            }
          }
          datesCopy.sort();
          // Sort the areas in alphabetical order for display
          const cityMapCopy = Object.keys(cityCopy).sort().map((elem) => cityCopy[elem]);
          setDates(datesCopy);
          setShiftData(shiftsCopy);
          setCityOrderCount(cityMapCopy);
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
    return moment(d).format('MMDDYYYY');
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
      // The following doesn't work on Android with JavaScript Core engine
      // See: https://stackoverflow.com/a/51400372
      // ret = d.toLocaleDateString('en-US', { month: 'long', day: '2-digit' });
      // So using moment
      ret = moment(d).format('MMMM DD');
    }
    return ret;
  };

  const _keyExtractor = (item: ICityCount) => item.id;

  const _hourDisplay = (d: Date): string => {
    return d.getHours().toString();
  }
  // console.warn(_cityCountData());
  // TODO: Need to set background color to the section header
  // https://github.com/saleel/react-native-super-grid/issues/60#issuecomment-417782829

  // <Text key={item.id}>{`Area: ${item.area} ID: ${item.id} Booked?: ${item.booked}`}</Text>
  // <SectionItem key={item.id} startHour={_hourDisplay(new Date(item.startTime))} endHour={_hourDisplay(new Date(item.endTime))} area={item.area} />
  return (
    <SafeAreaView style={styles.body}>
      {refreshing ?
      <ActivityIndicator size="large" color="#0000ff" /> :
      <>
        <FlatList
        data={cityOrderCount}
        renderItem={({item}) => <Text>{`${item.area} (${item.count})`}</Text>}
        horizontal={true}
        keyExtractor={_keyExtractor}
      />
      <SectionList
        renderItem={({item}) => <SectionItem key={item.id} startHour={_hourDisplay(new Date(item.startTime))} endHour={_hourDisplay(new Date(item.endTime))} area={item.area} />}
        renderSectionHeader={({section: {title}}) => (
          <SectionHeader title={title} numShifts={2} totalTime={4}/>
        )}
        sections={_createSections()}
        keyExtractor={(item) => item.id}
      />
      </>
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