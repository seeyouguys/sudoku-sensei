import React, {FC, useCallback, useMemo} from 'react';
import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {COLORS, SIZE} from '../utils/constants';

type Props = {
  numSelected?: string | null;
  setNumSelected: (num: string) => void;
  remainingNums: string[];
};

const NumPicker: FC<Props> = ({remainingNums, setNumSelected, numSelected}) => {
  // Выяснить, над каким вариантом сейчас находится палец:
  // 1. Для этого считаем ширину одного option
  //    (ширину экрана делим на число оставшихся чисел).
  //    Это значение мемоизируется и пересчитывается,
  //    когда в игре останется меньше чисел.
  // 2. Координаты положения пальца по оси X делим на ширину
  //    option и округляем. (~~ — это отбрасывание чисел после запятой)
  // 3. Получившееся число — это индекс выбранного элемента в массиве remainingNums
  const optionWidth = useMemo(() => {
    return ~~(SIZE.MAX_WIDTH / remainingNums.length);
  }, [remainingNums.length]);

  const getChosenOption = locationX => {
    const chosenOptionIdx = ~~(locationX / optionWidth);
    const newNum = remainingNums[chosenOptionIdx];
    return newNum;
  };

  const onMove = (e: GestureResponderEvent) => {
    const newNum = getChosenOption(e.nativeEvent.pageX);
    if (newNum !== numSelected) {
      setNumSelected(newNum);
    }
  };

  const onStart = (e: GestureResponderEvent) => {
    const newNum = getChosenOption(e.nativeEvent.pageX);
    setNumSelected(newNum);
  };

  return (
    <View
      style={styles.container}
      onStartShouldSetResponder={() => true}
      onResponderStart={onStart}
      onResponderMove={onMove}>
      {remainingNums.map((num, i) => (
        <View key={i}>
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
        </View>
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
