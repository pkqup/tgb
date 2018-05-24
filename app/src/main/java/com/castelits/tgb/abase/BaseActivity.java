package com.castelits.tgb.abase;

import android.os.Bundle;
import android.support.v4.content.ContextCompat;
import android.support.v7.app.AppCompatActivity;

import com.castelits.tgb.R;
import com.jaeger.library.StatusBarUtil;

import butterknife.ButterKnife;

/**
 * Created by LiuCun on 2017/11/7.<br>
 * Describe
 */

public class BaseActivity extends AppCompatActivity {

    public static String TAG;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        TAG = getClass().getSimpleName();
    }

    public void setStatusBar() {
        StatusBarUtil.setColor(this, ContextCompat.getColor(this, R.color.colorAccent),
                StatusBarUtil.DEFAULT_STATUS_BAR_ALPHA);
    }


    @Override
    public void setContentView(int layoutResID) {
        super.setContentView(layoutResID);
        //注入要在setContentView()方法之后调用
        ButterKnife.bind(this);
//        setStatusBar();
    }
}
