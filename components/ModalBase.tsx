import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {COLORS, SIZE} from '../utils/constants';

type Props = {
  style?: object;
  headerText?: string;
  children: React.ReactNode;
};

const ModalBase: FC<Props> = ({style, children, headerText}) => {
  return (
    <View style={[styles.dim, style]}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.text}>{headerText}</Text>
        </View>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dim: {
    width: SIZE.MAX_WIDTH,
    height: SIZE.MAX_HEIGHT,
    backgroundColor: 'rgba(00, 00, 00, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  container: {
    padding: 5,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: 'black',
    width: SIZE.MAX_WIDTH * 0.8,
    alignItems: 'center',
  },
  header: {
    backgroundColor: COLORS.accent,
    width: SIZE.MAX_WIDTH,
    padding: 2,
  },
  text: {
    color: COLORS.primary,
    fontFamily: 'Roboto',
    letterSpacing: 4,
    fontWeight: 'semibold',
    fontSize: 14,
    padding: 13,
    textAlign: 'center',
  },
});

export default ModalBase;
