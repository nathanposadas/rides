// CalendarComponent.js
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';

const CalendarComponent = () => {
  const [selected, setSelected] = useState('');


  const onDayPress = (day:string) => {
    setSelected(day.toString);
  };

  return (
    <View>
      <Calendar
        current={new Date().toISOString().split('T')[0]}
        monthFormat={'yyyy MM'}
        hideExtraDays={true}
        markingType={'simple'}
        onDayPress={onDayPress}
        // Marking the selected date
        markedDates={{
          [selected]: {
            selected: true,
            marked: true,
            selectedColor: 'blue', // Change this to your desired highlight color
          },
        }}
        // Customizing the styles of the calendar
        theme={{
          selectedDayBackgroundColor: 'blue',
          todayTextColor: 'red',
          dayTextColor: 'black',
          monthTextColor: 'black',
          arrowColor: 'blue',
        }}
      />
    </View>
  );
};

export default CalendarComponent;
