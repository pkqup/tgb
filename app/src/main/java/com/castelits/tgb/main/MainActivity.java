package com.castelits.tgb.main;


import android.content.Context;
import android.os.Bundle;
import android.support.design.widget.TabLayout;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentPagerAdapter;
import android.support.v4.view.ViewPager;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;

import com.castelits.tgb.R;
import com.castelits.tgb.abase.BaseActivity;

import java.util.ArrayList;
import java.util.List;

import butterknife.BindView;

public class MainActivity extends BaseActivity {

    @BindView(R.id.view_pager)
    ViewPager mViewPager;
    @BindView(R.id.tab_layout)
    TabLayout mTabLayout;

    private MyFragmentPagerAdapter myFragmentPagerAdapter;
    private List<Fragment> fragments;
    private String[] mTitles = new String[]{"信息查询", "政策消息", "账户信息", "系统设置"};
    public static final int[] mTabRes = new int[]{R.drawable.tab_one, R.drawable.tab_two, R.drawable.tab_three, R.drawable.tab_four};


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main_activity);
        initFragments();
        initView();
    }

    private void initFragments() {
        fragments = new ArrayList<>();
        fragments.add(new Fragment1());
        fragments.add(new Fragment2());
        fragments.add(new Fragment3());
        fragments.add(new Fragment4());
    }

    public View getTabView(Context context, int position) {
        View view = LayoutInflater.from(context).inflate(R.layout.home_tab_content, null);
        ImageView tabIcon = view.findViewById(R.id.tab_content_image);
        tabIcon.setImageResource(mTabRes[position]);
        TextView tabText = view.findViewById(R.id.tab_content_text);
        tabText.setText(mTitles[position]);
        return view;
    }

    private void initView() {
        myFragmentPagerAdapter = new MyFragmentPagerAdapter(getSupportFragmentManager());
        mViewPager.setAdapter(myFragmentPagerAdapter);
        mTabLayout.setupWithViewPager(mViewPager);
        for (int i = 0; i < mTitles.length; i++) {
            mTabLayout.getTabAt(i).setCustomView(getTabView(this, i));
        }

        mTabLayout.addOnTabSelectedListener(new TabLayout.OnTabSelectedListener() {
            @Override
            public void onTabSelected(TabLayout.Tab tab) {
                for (int i = 0; i < mTabLayout.getTabCount(); i++) {
                    View view = mTabLayout.getTabAt(i).getCustomView();
                    ImageView icon = view.findViewById(R.id.tab_content_image);
                    TextView text = view.findViewById(R.id.tab_content_text);
                    if (i == tab.getPosition()) {
                        icon.setSelected(true);
                        text.setSelected(true);
                    } else {
                        icon.setSelected(false);
                        text.setSelected(false);
                    }
                }
            }

            @Override
            public void onTabUnselected(TabLayout.Tab tab) {
            }

            @Override
            public void onTabReselected(TabLayout.Tab tab) {
            }
        });
    }

    public class MyFragmentPagerAdapter extends FragmentPagerAdapter {

        MyFragmentPagerAdapter(FragmentManager fm) {
            super(fm);
        }

        @Override
        public Fragment getItem(int position) {
            return fragments.get(position);
        }

        @Override
        public int getCount() {
            return mTitles.length;
        }

        @Override
        public CharSequence getPageTitle(int position) {
            return mTitles[position];
        }
    }

}
