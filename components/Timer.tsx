import React, {FC, useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {COLORS} from '../utils/constants';

export type Time = {
  minutes: number;
  seconds: number;
};

type Props = {
  style: object;
  passTimeToParent: (time: Time) => void;
  initialTime?: Time;
  shouldRun: boolean;
};

const Timer: FC<Props> = ({
  style,
  passTimeToParent,
  initialTime,
  shouldRun,
}) => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const interval = useRef<number>();

  useEffect(() => {
    if (shouldRun) {
      start(initialTime);
    } else {
      stop();
      passTimeToParent({minutes, seconds});
    }
    return () => {
      stop();
    };
  }, [shouldRun]);

  const start = (initialTime: Time) => {
    if (initialTime) {
      setMinutes(min);
      setSeconds(sec);
    }

    interval.current = setInterval(() => {
      setSeconds(sec => {
        if (sec === 59) {
          setMinutes(min => min + 1);
          return 0;
        }
        return sec + 1;
      });
    }, 1000);
  };

  const stop = () => {
    clearInterval(interval.current);
  };

  return (
    <View style={[styles.pad, style]}>
      <Text style={styles.time}>
        {minutes}:{seconds > 9 ? seconds : '0' + seconds}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  pad: {
    backgroundColor: COLORS.accent,
    width: 160,
    height: 80,
    alignItems: 'center',
    justifyContent: 'flex-end',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    paddingBottom: 11,
  },
  time: {
    color: COLORS.bgDark,
    fontFamily: 'BebasNums-Regular',
    fontSize: 65,
  },
});

export default Timer;
