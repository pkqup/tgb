package com.castelits.tgb.customview;

import android.content.Context;
import android.support.v4.view.ViewPager;
import android.util.AttributeSet;
import android.view.MotionEvent;

/**
 * Created by Allen on 2017/6/15.
 */

public class MyViewPager extends ViewPager {
    public MyViewPager(Context context) {
        super(context);
    }

    public MyViewPager(Context context, AttributeSet attrs) {
        super(context, attrs);
    }

    private boolean scroll = false;

    public void setCanScroll(boolean scroll) {
        this.scroll = scroll;
    }

    @Override
    public boolean dispatchTouchEvent(MotionEvent ev) {
        return super.dispatchTouchEvent(ev);

    }

    @Override
    public boolean onInterceptTouchEvent(MotionEvent ev) {
        if (scroll) {
            return super.onInterceptTouchEvent(ev);
        } else {
            return false;
        }
    }

    @Override
    public boolean onTouchEvent(MotionEvent ev) {
        return true;
    }
}
