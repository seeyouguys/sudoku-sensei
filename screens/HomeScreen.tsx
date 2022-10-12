import {NavigatorScreenParams} from '@react-navigation/native';
import React, {FC, useEffect, useState} from 'react';
import {Image, ImageBackground, StyleSheet, View, Text} from 'react-native';
import {pattern, sensei} from '../assets/Images';
import Button from '../components/button';
import ModalSelectLevel from '../components/ModalSelectLevel';
import {COLORS, SIZE} from '../utils/constants';
import {StatsContext} from '../utils/Contexts';
import {Level} from '../utils/SudokuSeeds';

// TODO: типизировать скрины
// https://reactnavigation.org/docs/typescript/
const HomeScreen: FC = ({navigation}) => {
  const [showSelectLevel, setShowSelectLevel] = useState(false);

  // const animBounceInUp = () => Animatable.
  const onClickNewGame = () => {
    setShowSelectLevel(true);
  };

  const startGame = (level: Level) => {
    navigation.navigate('Game', {level});
    setShowSelectLevel(false);
  };

  return (
    <>
      <ImageBackground
        style={styles.container}
        source={pattern}
        resizeMode="repeat">
        <Image style={styles.bgImage} source={sensei} resizeMode="cover" />

        {/* <StatsContext.Consumer> */}
        {/*   {stats => ( */}
        {/*     <Text */}
        {/*       style={{ */}
        {/*         color: 'green', */}
        {/*         backgroundColor: 'black', */}
        {/*         position: 'absolute', */}
        {/*       }}> */}
        {/*       {JSON.stringify(stats, null, 2)} */}
        {/*     </Text> */}
        {/*   )} */}
        {/* </StatsContext.Consumer> */}

        <Button onClick={onClickNewGame} isPrimary text="НОВАЯ" />
        <Button text="ПРОДОЛЖИТЬ" isDisabled />

        <View style={styles.footerButtons}>
          <Button isDisabled text="НАСТРОЙКИ" />
          <Button isDisabled text="СТАТИСТИКА" />
        </View>
      </ImageBackground>

      {showSelectLevel && <ModalSelectLevel startGame={startGame} />}
    </>
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
