import React, {FC} from 'react';
import {StyleSheet} from 'react-native';
import GameScreen from './screens/GameScreen';
import HomeScreen from './screens/HomeScreen';
import {COLORS} from './utils/constants';

const App: FC = () => {
  return <GameScreen />;
};

const styles = StyleSheet.create({});

export default App;
