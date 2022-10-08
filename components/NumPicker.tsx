import React, {FC} from 'react';
import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import {COLORS, SIZE} from '../utils/constants';

type Props = {
  numSelected?: string | null;
  setNumSelected: (num: string) => void;
  remainingNums: string[];
};

const NumPicker: FC<Props> = ({remainingNums, setNumSelected, numSelected}) => {
  return (
    <View style={styles.container}>
      {remainingNums.map((num, i) => (
        <TouchableWithoutFeedback key={i} onPressIn={() => setNumSelected(num)}>
          <View
            style={[
              styles.option,
              {
                backgroundColor:
                  numSelected === num ? COLORS.accent : COLORS.accent20,
              },
            ]}>
            <Text style={styles.optionText}>{num}</Text>
          </View>
        </TouchableWithoutFeedback>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SIZE.MAX_WIDTH * 0.95,
    marginTop: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  option: {
    borderRadius: 4,
    padding: 12,
  },
  optionText: {
    color: COLORS.primary,
    fontSize: 20,
    fontWeight: 'bold',
  },
  primaryButton: {
    backgroundColor: COLORS.accent,
    borderRadius: 2,
  },
  text: {
    color: COLORS.primary,
    padding: 14,
    fontFamily: 'Roboto',
    letterSpacing: 4,
    fontWeight: 'semibold',
    fontSize: 14,
  },
});

export default NumPicker;
