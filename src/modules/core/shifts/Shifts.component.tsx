import React from 'react';
import { SectionList, SectionListData } from 'react-native';
import { Shift as IShift } from './shifts.stateTypes';
import SectionItem from '../../../components/SectionItem';
import SectionHeader from '../../../components/SectionHeader';

export interface IShiftsProps {
  sections: readonly SectionListData<IShift>[]
}

const Shifts: React.FC<IShiftsProps> = (props: IShiftsProps) => {
  const _hourDisplay = (d: Date): string => {
    return d.getHours().toString();
  }

  return (
    <SectionList
      renderItem={({ item }) => (
        <SectionItem
          key={item.id}
          startHour={_hourDisplay(new Date(item.startTime))}
          endHour={_hourDisplay(new Date(item.endTime))}
          area={item.area}
        />
      )}
      renderSectionHeader={({section: {title}}) => (
        <SectionHeader title={title} numShifts={2} totalTime={4}/>
      )}
      sections={props.sections}
      keyExtractor={(item) => item.id}
    />
  );
};

export default Shifts;