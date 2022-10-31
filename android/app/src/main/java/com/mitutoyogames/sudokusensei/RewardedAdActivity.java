package com.mitutoyogames.sudokusensei;
import android.app.Activity;
import android.os.Bundle;
import android.widget.Toast;

import androidx.annotation.Nullable;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.RCTNativeAppEventEmitter;
import com.yandex.mobile.ads.common.AdRequest;
import com.yandex.mobile.ads.common.AdRequestError;
import com.yandex.mobile.ads.interstitial.InterstitialAd;
import com.yandex.mobile.ads.common.AdActivity;
import com.yandex.mobile.ads.rewarded.Reward;
import com.yandex.mobile.ads.rewarded.RewardedAd;
import com.yandex.mobile.ads.rewarded.RewardedAdEventListener;
import com.mitutoyogames.sudokusensei.RewardedAdModule;

import java.util.Map;
import java.util.HashMap;

public class RewardedAdActivity extends Activity {
  //...
 // private static final String BLOCK_ID = "R-M-DEMO-rewarded-client-side-rtb";
  private static final String BLOCK_ID = "R-M-1994039-1";

  private RewardedAd mRewardedAd;
  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    //...
    // Создание экземпляра RewardedAd.
    mRewardedAd = new RewardedAd(this);
    mRewardedAd.setBlockId(BLOCK_ID);

    // Создание объекта таргетирования рекламы.
    final AdRequest adRequest = new AdRequest.Builder().build();

    // Регистрация слушателя для отслеживания событий, происходящих в рекламе.
    mRewardedAd.setRewardedAdEventListener(new RewardedAdEventListener() {
      @Override
      public void onAdLoaded() {
        mRewardedAd.show();
      }

      @Override
      public void onRewarded(final Reward reward) {
        //...
        try{
          sendEvent(RewardedAdModule.reactContext,"onRewarded" );
        }catch (Exception e){
          e.printStackTrace();
        }
      }

      @Override
      public void onAdFailedToLoad(final AdRequestError adRequestError) {
        //...
        Toast.makeText(RewardedAdActivity.this, "Не удалось загрузить рекламу",
                Toast.LENGTH_LONG).show();
        finish();
      }

      private void sendEvent(ReactContext reactContext, String eventName ) {
        reactContext
                .getJSModule(RCTNativeAppEventEmitter.class)
                .emit(eventName, null);
      }

      @Override
      public void onAdShown() {
        //...
//        finish();
      }

      @Override
      public void onAdDismissed() {
        //...
        finish();
      }

      @Override
      public void onReturnedToApplication() {
      }

      @Override
      public void onLeftApplication() {
        //...
        //...
        try{
          sendEvent(RewardedAdModule.reactContext,"onLeftApplication" );
        }catch (Exception e){
          e.printStackTrace();
        }
      }
    });


    // Загрузка объявления.
    mRewardedAd.loadAd(adRequest);
  }
}
