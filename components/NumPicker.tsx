import React, {FC, useMemo, useRef, useEffect} from 'react';
import {
  Animated,
  GestureResponderEvent,
  StyleSheet,
  Text,
  Vibration,
  View,
} from 'react-native';
import {COLORS, SIZE} from '../utils/constants';

type Props = {
  numSelected?: string | null;
  setNumSelected: (num: string) => void;
  remainingNums: string[];
};

const NumPicker: FC<Props> = ({remainingNums, setNumSelected}) => {
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

  // Когда убрались лишние цифры, подкорректировать положение touch
  useEffect(() => {
    if (remainingNums && remainingNums.length < 9) {
      const newSelected = remainingNums[0];
      setNumSelected(newSelected);
      animSpringTo(optionWidth * 0.5);
    }
  }, [remainingNums.length]);

  const roundToNearestX = x => {
    return (~~(x / optionWidth) + 0.5) * optionWidth;
  };

  const getChosenOption = x => {
    const chosenOptionIdx = ~~(x / optionWidth);
    const newNum = remainingNums[chosenOptionIdx];
    return newNum;
  };

  const microVibration = () => {
    Vibration.vibrate(4);
  };

  useEffect(() => {
    setTimeout(() => {
      const selectedFromStart = remainingNums[4];
      setNumSelected(selectedFromStart);
      animSpringTo(optionWidth * 4.5);
    }, 100);
  }, []);

  const touchX = useRef(new Animated.Value(-100)).current;
  const touchLength = useRef(new Animated.Value(1)).current;
  const touchRadius = useRef(44).current;

  const animSpringTo = x =>
    Animated.spring(touchX, {
      toValue: x,
      speed: 20,
      useNativeDriver: true,
    }).start();

  const animScaleTo = s =>
    Animated.spring(touchLength, {
      toValue: s,
      useNativeDriver: true,
    }).start();

  const onStart = (e: GestureResponderEvent) => {
    microVibration();

    animSpringTo(e.nativeEvent.pageX);
    animScaleTo(1.25);

    const newNum = getChosenOption(e.nativeEvent.pageX);
    setNumSelected(newNum);
  };

  const onRelease = (e: GestureResponderEvent) => {
    const endPoint = roundToNearestX(e.nativeEvent.pageX);
    animSpringTo(endPoint);
    animScaleTo(1);

    const newNum = getChosenOption(e.nativeEvent.pageX);
    setNumSelected(newNum);
  };

  return (
    <View
      style={styles.container}
      onStartShouldSetResponder={() => true}
      onResponderStart={onStart}
      // onResponderMove={onMove}
      onResponderRelease={onRelease}>
      <Animated.View
        style={[
          styles.touch,
          {
            transform: [
              {
                translateX: Animated.subtract(touchX, 22),
              },
              {
                scaleX: touchLength,
              },
            ],
            height: touchRadius,
            width: touchRadius,
            borderRadius: touchRadius,
          },
        ]}
      />
      {remainingNums.map((num, i) => (
        <View key={i}>
          <View style={[styles.option, {width: optionWidth}]}>
            <Text style={styles.optionText}>{num}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SIZE.MAX_WIDTH,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  touch: {
    position: 'absolute',
    backgroundColor: COLORS.accent,
  },
  option: {
    borderRadius: 100,
    padding: 0,
    alignItems: 'center',
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
