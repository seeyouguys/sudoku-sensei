package com.mitutoyogames.sudokusensei;

import android.content.Intent;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class RewardedAdModule extends ReactContextBaseJavaModule {

  public static ReactApplicationContext reactContext;

  public RewardedAdModule(ReactApplicationContext reactContext) {
    super(reactContext);
    RewardedAdModule.reactContext = reactContext;
  }

  @NonNull
  @Override
  public String getName() {
    return "RewardedAdModule";
  }

  @ReactMethod
  public void openAdActivity() {
    Intent intent = new Intent(getCurrentActivity(), RewardedAdActivity.class);
    getCurrentActivity().startActivity(intent);
  }
}
