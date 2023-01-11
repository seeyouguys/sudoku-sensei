/**
  This exposes RewardedAd from MyTarget SDK as a JS module.

  Use RewardedAdModule.initAd() to load and show an ad.

  -------------------------------------------------------------------------------

  Events:
  - onLoad
  - onNoAd (event.reason: string)
  - onClick
  - onDisplay
  - onDismiss
  - onReward

  You can set and remove event listeners for them like this:

  useEffect(() => {
    if (DeviceEventEmitter.listenerCount('onRewarded') === 0) {
      DeviceEventEmitter.addListener('onRewarded', () => {
         ...
      });
    }
  }, []);

  useEffect(() => {
    return () => DeviceEventEmitter.removeAllListeners('onRewarded');
  }, []);

  -------------------------------------------------------------------------------

  MyTarget docs (useful for tinkering with RewardedAdModule.java):
  https://target.my.com/help/partners/mob/android_formats/en#android_rewarded
 */
import {NativeModules} from 'react-native';
const {RewardedAdModule} = NativeModules;

interface RewardedAdInterface {
  initAd(): void;
}

export const showRewardedAd = (): void => RewardedAdModule.initAd();
