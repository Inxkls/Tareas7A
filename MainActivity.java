package com.example.animationwithframes;

import android.annotation.SuppressLint;
import android.graphics.drawable.AnimationDrawable;
import android.os.Bundle;
import android.view.MotionEvent;
import android.widget.ImageView;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

public class MainActivity extends AppCompatActivity {

    private AnimationDrawable animationCat;
    private ImageView imagen;
    @SuppressLint("MissingInflatedId")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_main);

        imagen=findViewById(R.id.imageAnimation);
        imagen.setBackgroundResource(R.drawable.cat_animation);
        animationCat=(AnimationDrawable) imagen.getBackground();
        animationCat.run();

        }
        @Override
        public boolean onTouchEvent(MotionEvent event) {
            if (event.getAction()==MotionEvent.ACTION_DOWN){
                if(animationCat.isRunning()){
                    animationCat.stop();
                }else{
                    animationCat.start();
                }
            }
        return super.onTouchEvent(event);
    }
}
