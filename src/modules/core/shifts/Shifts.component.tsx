import React from 'react';
import { SectionList, SectionListData } from 'react-native';
import { Shift as IShift } from './shifts.stateTypes';
import SectionItem from '../../../components/SectionItem';
import SectionHeader from '../../../components/SectionHeader';
import PillButton from '../../../components/PillButton';

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
          buttonComponent={<PillButton text={'Book'} type='positive' />}
        />
      )}
      renderSectionHeader={({section: {title}}) => (
        <SectionHeader title={title} />
      )}
      sections={props.sections}
      keyExtractor={(item) => item.id}
    />
  );
};

export default Shifts;