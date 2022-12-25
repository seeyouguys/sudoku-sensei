import * as Animatable from 'react-native-animatable';
import React, {FC, useContext, useEffect, useState} from 'react';
import {
  DeviceEventEmitter,
  ImageBackground,
  StyleSheet,
  ToastAndroid,
  View,
} from 'react-native';
import {pattern, sensei} from '../assets/Images';
import Button from '../components/button';
import Logo from '../components/Logo';
import ModalSelectLevel from '../components/ModalSelectLevel';
import {COLORS, SIZE} from '../utils/constants';
import {Level} from '../utils/SudokuSeeds';
import {StatsContext} from '../utils/Contexts';

// TODO: типизировать скрины
// https://reactnavigation.org/docs/typescript/
const HomeScreen: FC = ({navigation, setStats}) => {
  const [showSelectLevel, setShowSelectLevel] = useState(false);
  const {hints} = useContext(StatsContext);

  // const animBounceInUp = () => Animatable.
  const onClickNewGame = () => {
    setShowSelectLevel(true);
  };

  const startGame = (level: Level) => {
    navigation.navigate('Game', {level});
    setShowSelectLevel(false);
  };

  // ########################### OLD CODE FOR YANDEX ADS #######################
  // Работа с Yandex SDK через нативные модули
  // const {RewardedAdModule} = NativeModules;
  // const showRewardedAd = (): void => RewardedAdModule.openAdActivity();

  // useEffect(() => {
  //   // Когда просмотр рекламы засчитался, добавить подсказку
  //   if (DeviceEventEmitter.listenerCount('onRewarded') === 0) {
  //     DeviceEventEmitter.addListener('onRewarded', () => {
  //       ToastAndroid.show('+1 подсказка', ToastAndroid.SHORT);
  //       setStats(prev => ({...prev, hints: prev.hints + 1}));
  //     });
  //   }
  // }, []);

  // componentWillUnmount
  // useEffect(() => {
  //   return () => DeviceEventEmitter.removeAllListeners('onRewarded');
  // }, []);
  // ########################### OLD CODE FOR YANDEX ADS #######################

  return (
    <>
      <ImageBackground
        style={styles.container}
        source={pattern}
        resizeMode="repeat">
        <Animatable.Image
          animation="pulse"
          iterationCount="infinite"
          duration={15000}
          useNativeDriver={true}
          style={styles.bgImage}
          source={sensei}
          resizeMode="cover"
        />
        <Logo style={styles.logo} />
        <Button onClick={onClickNewGame} isPrimary text="НОВАЯ" />
        <Button text="ПРОДОЛЖИТЬ" isDisabled />

        <View style={styles.footerButtons}>
          <Button isDisabled text="НАСТРОЙКИ" />
          <Button text={`ПОДСКАЗКИ(${hints})`} isDisabled />
          {/* <Button isDisabled text="СТАТИСТИКА" /> */}
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
    height: SIZE.MAX_HEIGHT,
    position: 'absolute',
    borderWidth: 1,
    opacity: 0.5,
  },
  logo: {
    marginTop: 230,
    marginBottom: 150,
  },
});

export default HomeScreen;
