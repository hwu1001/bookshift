import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, SectionList } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

interface IShift {
  id: string,
  area: string,
  booked: boolean,
  startTime: number,
  endTime: number
}

const AvailableShifts: React.FC = () => {
  let [shiftData, setShiftData] = useState<IShift[]>([]);
  useEffect(() => {
    let didCancel = false;
  
    // Starting with this: https://github.com/facebook/react/issues/14326#issuecomment-472043812
    async function fetchMyAPI() {
      let url = 'http://127.0.0.1:8080/shifts';
      const response = await fetch(url);
      const json = await response.json();
      if (!didCancel) { // Ignore if we started fetching something else
        console.warn(json);
        setShiftData(json);
      }
    }  
  
    fetchMyAPI();
    return () => { didCancel = true; }; // Remember if we start fetching something else
  }, []);

  return (
    <SafeAreaView>
      <View style={styles.body}>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>AvailableShifts screen</Text>
          <SectionList
            renderItem={({item, index, section}) => <Text key={index}>{item.one + ' ' + item.two}</Text>}
            renderSectionHeader={({section: {title}}) => (
              <Text style={{fontWeight: 'bold'}}>{title}</Text>
            )}
            sections={[
              {title: 'Title1', data: [{one: '1one', two: '1two'}, {one: '2one', two: '2two'}]},
            ]}
            keyExtractor={(item, index) => item + index}
          />
        </View>
      </View>
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
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
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