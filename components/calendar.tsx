import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';

interface Day {
  dateString: string; // The date string in format 'YYYY-MM-DD'
  year: number;       // The year of the date
  month: number;      // The month of the date (1-12)
  day: number;        // The day of the month (1-31)
}

interface MarkedDate {
  selected: boolean;
  marked: boolean;
  selectedColor?: string; // Optional color for selected dates
  tapCount?: number;      // Optional count of taps for the date
}

// Add props interface to CalendarComponent
interface CalendarComponentProps {
  setAttendedCount: React.Dispatch<React.SetStateAction<number>>;
  setAbsentCount: React.Dispatch<React.SetStateAction<number>>;
}

const CalendarComponent: React.FC<CalendarComponentProps> = ({
  setAttendedCount,
  setAbsentCount,
}) => {
  const [markedDates, setMarkedDates] = useState<{ [key: string]: MarkedDate }>({});

  const onDayPress = (day: Day) => {
    const selectedDay = day.dateString; // Extracting the date string (e.g. '2024-10-14')

    setMarkedDates((prevMarkedDates) => {
      const currentTap = prevMarkedDates[selectedDay]?.tapCount || 0;

      // Determine new tap count and color based on the current tap
      let newTapCount = (currentTap + 1) % 3; // Cycles between 0, 1, and 2
      let selectedColor: string | undefined = undefined;

      if (newTapCount === 1) {
        selectedColor = 'green'; // 1st tap (attended)
      } else if (newTapCount === 2) {
        selectedColor = 'red'; // 2nd tap (absent)
      }

      // Construct new markedDates object
      const updatedMarkedDates = {
        ...prevMarkedDates,
        [selectedDay]: {
          selected: true,
          marked: true,
          selectedColor: selectedColor, // Assign color based on tap count
          tapCount: newTapCount, // Store tap count for this date
        },
      };

      // Update counts based on the new tap count
      if (newTapCount === 1) {
        setAttendedCount((prevCount) => prevCount + 1); // Increment attended count
      } else if (newTapCount === 2) {
        setAbsentCount((prevCount) => prevCount + 1); // Increment absent count
      } else if (newTapCount === 0) {
        // If tap count is 0, check if it was previously attended or absent and decrement the count
        if (currentTap === 1) {
          setAttendedCount((prevCount) => prevCount - 1); // Decrement attended count
        } else if (currentTap === 2) {
          setAbsentCount((prevCount) => prevCount - 1); // Decrement absent count
        }
        delete updatedMarkedDates[selectedDay]; // Remove the marking
      }

      return updatedMarkedDates;
    });
  };

  return (
    <View>
      <Calendar
        current={new Date().toISOString().split('T')[0]}
        monthFormat={'yyyy MM'}
        hideExtraDays={true}
        markingType={'simple'}
        onDayPress={onDayPress}
        // Apply marked dates
        markedDates={markedDates}
        // Customizing the styles of the calendar
        theme={{
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
