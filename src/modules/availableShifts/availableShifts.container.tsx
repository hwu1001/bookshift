import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import AvailableShifts from './availableShifts.component';
import { actions, stateTypes } from '../core/shifts';
import { AppState } from '../../main';

export type AvailableShiftsContainerProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

// The key on this interface is a date string of MMDDYYY
interface IShiftDateMap { [date: string]: stateTypes.Shift[] }

// TODO: Export this type from AreaFilter and import it to use
interface ICityCount {
  id: string,
  area: string,
  count: number
}

// 
interface ICityCountMap { [areaName: string]: ICityCount };

const AvailableShiftsContainer: React.FC<AvailableShiftsContainerProps> = ({ loading, shifts, fetchShifts }: AvailableShiftsContainerProps) => {
  let [shiftData, setShiftData] = useState<IShiftDateMap>({});
  let [cityOrderCount, setCityOrderCount] = useState<ICityCount[]>([]);
  let [dates, setDates] = useState<string[]>([]);
  let [currentArea, setCurrentArea] = useState<string>('');

  useEffect(() => {
    fetchShifts();
  }, []);

  useEffect(() => {
    if (!loading) {
      _setLocalState(shifts);
    }
  }, [loading]);

  const _setLocalState = (shifts: stateTypes.ShiftMap) => {
    if (Object.keys(shifts).length < 1) {
      return;
    }
    const todayDateStr = _getFullDateStr(new Date());
    let shiftsCopy: IShiftDateMap= {};
    let datesCopy: string[] = [];
    let cityCopy: ICityCountMap = {};
    let curArea = '';
    for (const shiftId in shifts) {
      const shift = shifts[shiftId];
      const dateKey = _getFullDateStr(new Date(shift.startTime));

      if (curArea === '' || shift.area < curArea) {
        curArea = shift.area;
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
    setCurrentArea(curArea);
  };
  
  const _createSections = () => {
    let sections = [];
    for (const date of dates) {
      const filteredShiftData = shiftData[date].filter(shift => shift.area === currentArea);
      if (filteredShiftData.length < 1) {
        continue;
      }
      sections.push({
        title: _dateTitle(new Date(shiftData[date][0].startTime)),
        data: filteredShiftData
      });
    }
    return sections;
  };

  const _getFullDateStr = (d: Date) => {
    return moment(d).format('MMDDYYYY');
  };

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

  const isSameDay = (d1: Date, d2: Date): boolean => {
    return d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate();
  };

  const _filterArea = (area: string) => {
    setCurrentArea(area);
  };

  return (
    <AvailableShifts
      loading={loading}
      areaFilterProps={{ data: cityOrderCount,  filterCb: _filterArea}}
      shiftListProps={{ sections: _createSections() }}
    />
  )
};

const mapStateToProps = (state: AppState) => {
  return ({
    loading: state.shifts.loading,
    shifts: state.shifts.shifts
  });
};

const mapDispatchToProps = {
  fetchShifts: actions.fetchShifts
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AvailableShiftsContainer);