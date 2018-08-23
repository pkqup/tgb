package com.castelits.tgb.main;

import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;

import com.castelits.tgb.R;
import com.castelits.tgb.abase.BaseActivity;

public class SplashActivity extends BaseActivity {

    private Handler handler = new Handler();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        handler.postDelayed(new Runnable() {
            @Override
            public void run() {
                Intent intent = new Intent(SplashActivity.this, HomeActivity.class);
                startActivity(intent);
                finish();
            }
        }, 1500);
    }
}
