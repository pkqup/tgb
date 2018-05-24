package com.castelits.tgb.main;

import android.os.Build;
import android.os.Bundle;
import android.view.KeyEvent;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;

import com.castelits.tgb.R;
import com.castelits.tgb.abase.BaseActivity;

import butterknife.BindView;

/**
 * Created by liucun on 2018/5/2.
 */

public class HomeActivity extends BaseActivity {

    @BindView(R.id.webView)
    WebView webView;

    private long exitTime;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        setContentView(R.layout.main_home_activity);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            //设置同时支持http和https加载
            webView.getSettings().setMixedContentMode(WebSettings.MIXED_CONTENT_ALWAYS_ALLOW);
        }
        webView.getSettings().setCacheMode(WebSettings.LOAD_DEFAULT);// 设置默认缓存模式
        webView.getSettings().setBlockNetworkImage(false);// 解除网络图片数据阻止
        webView.getSettings().setLoadsImagesAutomatically(true);// 支持自动加载图片
        webView.getSettings().setDomStorageEnabled(true);// 设置是否开启DOM存储API权限
        webView.getSettings().setAppCacheEnabled(true);// 设置Application缓存API是否开启
        webView.getSettings().setAppCachePath(getCacheDir().getAbsolutePath());// 设置缓存路径
        webView.getSettings().setAllowFileAccess(true);// 设置在WebView内部是否允许访问文件
        webView.getSettings().setAllowContentAccess(true);// 设置WebView是否使用其内置的变焦机制
        webView.getSettings().setDisplayZoomControls(true);// 设置WebView使用内置缩放机制时，是否展现在屏幕缩放控件上
        webView.getSettings().setUseWideViewPort(true);// 将图片调整到适合WebView的大小
        webView.setHorizontalScrollBarEnabled(false);//水平不显示滚动条
        webView.setVerticalScrollBarEnabled(false); //垂直不显示滚动条
        webView.getSettings().setPluginState(WebSettings.PluginState.ON);
        webView.getSettings().setLayoutAlgorithm(WebSettings.LayoutAlgorithm.SINGLE_COLUMN);
        webView.getSettings().setJavaScriptCanOpenWindowsAutomatically(true);//设置允许js弹框
        webView.setWebChromeClient(new WebChromeClient());
        webView.setWebViewClient(new WebViewClient() {
            public boolean shouldOverrideUrlLoading(WebView view, String url) {
                view.loadUrl(url);
                return true;
            }
        });
        webView.getSettings().setJavaScriptEnabled(true);// 设置js可用
//        webView.addJavascriptInterface(
//                new JsUtils(this), "tgb");// 设置js调用接口

        webView.loadUrl("file:///android_asset/tgb_mobile/login.html");
    }

    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
        if (keyCode == KeyEvent.KEYCODE_BACK && webView.canGoBack()) {
            webView.goBack();
            return true;
        } else {
            if ((System.currentTimeMillis() - exitTime) > 2000) {
                Toast.makeText(getApplicationContext(), "再按一次退出程序", Toast.LENGTH_SHORT).show();
                exitTime = System.currentTimeMillis();
            } else {
                finish();
            }
        }
        return true;
    }
}
