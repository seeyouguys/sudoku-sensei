import React, {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS} from '../utils/constants';

type Props = {
  text: string;
  isPrimary?: boolean;
  onClick?: () => void;
};

const Button: FC<Props> = ({text, isPrimary, onClick}) => {
  return (
    <TouchableOpacity style={isPrimary && styles.primaryButton}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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

export default Button;
