import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useAsyncStorage} from '@react-native-async-storage/async-storage';
import React, {FC, useState, useEffect} from 'react';
import {StyleSheet, View, StatusBar} from 'react-native';
import GameScreen from './screens/GameScreen';
import HomeScreen from './screens/HomeScreen';
import {COLORS} from './utils/constants';
import {defaultPlayerStats, PlayerStats, StatsContext} from './utils/Contexts';

const Stack = createNativeStackNavigator();

const App: FC = () => {
  const [stats, setStats] = useState<PlayerStats | null>();
  const {getItem, setItem} = useAsyncStorage('@stats');

  const readStatsFromStorage = async () => {
    try {
      const loadedStats = await getItem();
      if (loadedStats) {
        setStats(JSON.parse(loadedStats));
      } else {
        setStats(defaultPlayerStats);
      }
    } catch (e) {
      console.log(e.message);
      // read error
    }
  };

  const writeStatsToStorage = async (newStats: PlayerStats) => {
    await setItem(JSON.stringify(newStats));
  };

  // При запуске считать данные из AsyncStorage
  useEffect(() => {
    readStatsFromStorage();
  }, []);

  // Когда поменялся stats, сохранять это в AsyncStorage
  useEffect(() => {
    if (stats) {
      const updates = checkIfNewLevelAvailable(stats);
      if (updates) {
        setStats(prevStats => {
          return {...prevStats, ...updates};
        });
      }
      writeStatsToStorage(stats);
    }
  }, [stats]);

  // Проверить счетчик побед до открытия новой сложности
  const checkIfNewLevelAvailable = (stats: PlayerStats): object => {
    switch (stats.maxLevel) {
      case 'easy':
        if (stats.winsToLevelUpCounter > 2) {
          return {winsToLevelUpCounter: 0, maxLevel: 'medium'};
        }
        break;
      case 'medium':
        if (stats.winsToLevelUpCounter > 4) {
          return {winsToLevelUpCounter: 0, maxLevel: 'hard'};
        }
        break;
      case 'hard':
        if (stats.winsToLevelUpCounter > 9) {
          return {winsToLevelUpCounter: 0, maxLevel: 'evil'};
        }
        break;
    }
  };

  if (stats) {
    return (
      <>
        <StatusBar backgroundColor="#101010" />
        <View style={styles.bg}>
          <StatsContext.Provider value={stats}>
            <NavigationContainer>
              <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="Home">
                  {props => <HomeScreen {...props} setStats={setStats} />}
                </Stack.Screen>
                <Stack.Screen name="Game">
                  {props => <GameScreen {...props} setStats={setStats} />}
                </Stack.Screen>
              </Stack.Navigator>
            </NavigationContainer>
          </StatsContext.Provider>
        </View>
      </>
    );
  }
};

const styles = StyleSheet.create({
  bg: {
    backgroundColor: COLORS.bgDark,
    flex: 1,
  },
});

export default App;
