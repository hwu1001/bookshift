package com.bookshift;

import android.os.Bundle;
import androidx.annotation.Nullable;
import android.widget.ImageView;

// import com.facebook.react.ReactActivity;
import com.reactnativenavigation.NavigationActivity;

public class MainActivity extends NavigationActivity {

    // /**
    //  * Returns the name of the main component registered from JavaScript.
    //  * This is used to schedule rendering of the component.
    //  */
    // @Override
    // protected String getMainComponentName() {
    //     return "bookshift";
    // }
    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setSplashLayout();
    }

    private void setSplashLayout() {
        ImageView img = new ImageView(this);
        img.setImageDrawable(getDrawable(R.drawable.ic_android));
        setContentView(img);
    }
}
