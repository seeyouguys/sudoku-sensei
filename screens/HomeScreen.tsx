import React, {FC} from 'react';
import {Image, ImageBackground, StyleSheet, Text, View} from 'react-native';
import {pattern, sensei} from '../assets/Images';
import Button from '../components/button';
import {COLORS, SIZE} from '../utils/constants';

const HomeScreen: FC = () => {
  return (
    <ImageBackground
      style={styles.container}
      source={pattern}
      resizeMode="repeat">
      <Image style={styles.bgImage} source={sensei} resizeMode="cover" />
      <Button text="НОВАЯ" />
      <Button text="ПРОДОЛЖИТЬ" isPrimary />

      <View style={styles.footerButtons}>
        <Button text="НАСТРОЙКИ" />
        <Button text="СТАТИСТИКА" />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: COLORS.bgDark,
    alignItems: 'center',
  },
  footerButtons: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  bgImage: {
    width: SIZE.MAX_WIDTH,
    height: SIZE.MAX_HEIGHT / 1.5,
    borderWidth: 1,
  },
});

export default HomeScreen;
