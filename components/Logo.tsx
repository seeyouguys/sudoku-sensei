import React, {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS, SIZE} from '../utils/constants';

interface Props {
  style?: StyleSheet.NamedStyles<any>;
}

const Logo: FC<Props> = ({style}) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.line}>
        <Text style={[styles.text, styles.row1]}>СУДОКУ</Text>
      </View>
      <Text style={[styles.text, styles.row2]}>СЕНСЕИ</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  row1: {
    color: COLORS.bgDark,
    fontWeight: 'bold',
    letterSpacing: 0,
  },
  row2: {
    color: COLORS.accent,
    fontWeight: 'normal',
  },
  text: {
    color: COLORS.primary,
    fontFamily: 'Roboto',
    letterSpacing: 0.5,
    // fontWeight: 'bold',
    fontSize: 35,
    lineHeight: 37,
  },
  line: {
    paddingTop: 4,
    width: SIZE.MAX_WIDTH,
    backgroundColor: COLORS.accent,
    position: 'relative',
    alignItems: 'center',
  },
});

export default Logo;
