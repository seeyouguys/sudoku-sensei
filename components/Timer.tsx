import React, {FC, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {COLORS} from '../utils/constants';

type Props = {
  style: object;
};

const Timer: FC<Props> = ({style}) => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(sec => {
        if (sec === 59) {
          setMinutes(min => min + 1);
          return 0;
        }
        return sec + 1;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

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
