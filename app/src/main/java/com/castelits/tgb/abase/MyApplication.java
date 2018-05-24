package com.castelits.tgb.abase;

import android.content.Context;
import android.content.pm.ApplicationInfo;
import android.support.multidex.MultiDexApplication;

import com.socks.library.KLog;

/**
 * Created by LiuCun on 2017/11/24.<br>
 * Describe 继承MultiDexApplication，解决方法数超过65535编译失败问题
 */
public class MyApplication extends MultiDexApplication {

    public static Context appContext;
    public static boolean isDebug;

    @Override
    public void onCreate() {
        super.onCreate();
        appContext = getApplicationContext();
        isDebug = isInDebug(appContext);

        //初始化KLog,如果是debug模式，不打印
        KLog.init(isDebug);

        //在这里为应用设置异常处理程序，然后我们的程序才能捕获未处理的异常
        CrashHandler.getInstance().init(this);
    }

    //判断是否是debug模式
    public static boolean isInDebug(Context context) {
        try {
            ApplicationInfo info = context.getApplicationInfo();
            return (info.flags & ApplicationInfo.FLAG_DEBUGGABLE) != 0;
        } catch (Exception e) {
            return false;
        }
    }

    public static boolean isDebug() {
        return isDebug;
    }

    public static Context getContext() {
        return appContext;
    }
}
