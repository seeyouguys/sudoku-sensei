import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import React, {FC, useState, useEffect} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import GameScreen from './screens/GameScreen';
import HomeScreen from './screens/HomeScreen';
import {COLORS} from './utils/constants';
import {Level} from './utils/SudokuSeeds.tsx';

const Stack = createNativeStackNavigator();

type LevelStats = {
  bestTime: String;
  wins: String;
};

type PlayerStats = {
  easy: LevelStats;
  medium: LevelStats;
  hard: LevelStats;
  evil: LevelStats;
  winsToLevelUpCounter: Number;
  maxLevel: Level;
};

const App: FC = () => {
  const [stats, setStats] = useState<PlayerStats | null>();
  const {getItem, setItem} = useAsyncStorage('@player_stats');

  const readStatsFromStorage = async () => {
    const loadedStats = await getItem();
    setStats(JSON.parse(loadedStats));
  };

  const writeStatsToStorage = async (newStats: PlayerStats) => {
    await setItem(JSON.stringify(newStats));
    setStats(JSON.stringify(newStats));
  };

  const dummyStats: PlayerStats = {
    easy: {
      bestTime: Math.random().toString(36).substr(2, 5),
      wins: ~~(Math.random() * 10),
    },
    medium: {
      bestTime: Math.random().toString(36).substr(2, 5),
      wins: ~~(Math.random() * 10),
    },
    hard: {
      bestTime: Math.random().toString(36).substr(2, 5),
      wins: ~~(Math.random() * 10),
    },
    evil: {
      bestTime: Math.random().toString(36).substr(2, 5),
      wins: ~~(Math.random() * 10),
    },
    winsToLevelUpCounter: ~~(Math.random() * 10),
    maxLevel: 'medium',
  };

  useEffect(() => {
    readStatsFromStorage();
  }, []);
  return (
    <View style={{margin: 40}}>
      <Text>Current stats: {JSON.stringify(stats, null, 2)}</Text>
      <TouchableOpacity onPress={() => writeStatsToStorage(dummyStats)}>
        <Text>Update stats</Text>
      </TouchableOpacity>
    </View>
  );
  return (
    <View style={styles.bg}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Game" component={GameScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  bg: {
    backgroundColor: COLORS.bgDark,
    flex: 1,
  },
});

export default App;
