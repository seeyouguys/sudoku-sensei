package com.mitutoyogames.sudokusensei;

import android.util.Log;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.my.target.ads.Reward;
import com.my.target.ads.RewardedAd;
import com.my.target.common.MyTargetConfig;
import com.my.target.common.MyTargetManager;

public class RewardedAdModule extends ReactContextBaseJavaModule {

  public static ReactApplicationContext reactContext;

  private void sendEvent(ReactContext reactContext,
                         String eventName,
                         @Nullable WritableMap params) {
    reactContext
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
            .emit(eventName, params);
  }

  public RewardedAdModule(ReactApplicationContext reactContext) {
    super(reactContext);
    RewardedAdModule.reactContext = reactContext;
  }

  @Override
  public String getName() {
    return "RewardedAdModule";
  }

  private RewardedAd ad;
  private int YOUR_SLOT_ID = 1182008;

  @ReactMethod
  private void initAd()
  {
    // Создаем экземпляр RewardedAd
    ad = new RewardedAd(YOUR_SLOT_ID, reactContext);

    // Устанавливаем слушатель событий
    ad.setListener(new RewardedAd.RewardedAdListener() {
      @Override
      public void onLoad(RewardedAd ad) {
        // Запускаем показ
        sendEvent(reactContext,"onLoad", null);
        ad.show();
      }

      @Override
      public void onNoAd(String reason, RewardedAd ad) {
        WritableMap params = Arguments.createMap();
        params.putString("reason", reason);
        sendEvent(reactContext,"onNoAd", params);
        Toast.makeText(reactContext, "Нет доступной рекламы",
                Toast.LENGTH_LONG).show();
      }

      @Override
      public void onClick(RewardedAd ad) {
        sendEvent(reactContext,"onClick", null);
      }

      @Override
      public void onDisplay(RewardedAd ad) {
        sendEvent(reactContext,"onDisplay", null);
      }

      @Override
      public void onDismiss(RewardedAd ad) {
        sendEvent(reactContext,"onDismiss", null);
      }

      @Override
      public void onReward(@NonNull Reward reward, @NonNull RewardedAd ad) {
        // При получении награды за просмотр полноэкранной рекламы в метод onReward слушателя
        // передаётся объект Reward, содержащий поле type (Reward.type)

        sendEvent(reactContext, "onReward", null);
      }
    });

    // Запускаем загрузку данных
    ad.load();
  }
}