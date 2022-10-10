import React, {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS} from '../utils/constants';

type Props = {
  text: string;
  isPrimary?: boolean;
  onClick?: () => void;
  isDisabled?: boolean;
};

const Button: FC<Props> = ({text, isPrimary, onClick, isDisabled}) => {
  const style = [];

  if (isPrimary) {
    style.push(styles.primaryButton);
  }

  if (isDisabled) {
    style.push(styles.disabledButton);
  }

  return (
    <TouchableOpacity disabled={isDisabled} style={style}>
      <Text style={styles.text}>{text}</Text>
      {isDisabled && <View style={styles.line} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  primaryButton: {
    backgroundColor: COLORS.accent,
    borderRadius: 2,
  },
  disabledButton: {
    opacity: 0.5,
    alignItems: 'center',
  },
  text: {
    color: COLORS.primary,
    padding: 14,
    fontFamily: 'Roboto',
    letterSpacing: 4,
    fontWeight: 'semibold',
    fontSize: 14,
  },
  line: {
    width: 200,
    height: 1,
    backgroundColor: COLORS.primary,
    position: 'relative',
    bottom: '50%',
  },
});

export default Button;
