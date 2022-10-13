import React, {FC} from 'react';
import * as Animatable from 'react-native-animatable';
import {StyleSheet, View} from 'react-native';
import {COLORS, SIZE} from '../utils/constants';

interface Props {
  style?: StyleSheet.NamedStyles<any>;
}

const Logo: FC<Props> = ({style}) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.line}>
        <Animatable.Text
          animation="bounceInLeft"
          duration={1100}
          useNativeDriver={true}
          style={[styles.text, styles.row1]}>
          СУДОКУ
        </Animatable.Text>
      </View>
      <Animatable.Text
        animation="bounceInRight"
        duration={1100}
        useNativeDriver={true}
        style={[styles.text, styles.row2]}>
        СЕНСЕИ
      </Animatable.Text>
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
