package com.example.authenticationfield;

import android.content.Intent;
import android.os.Bundle;
import android.text.TextUtils;
import android.view.View;
import android.widget.TextView;
import android.widget.Toast;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

import com.google.android.material.button.MaterialButton;
import com.google.android.material.textfield.TextInputEditText;

public class Login extends AppCompatActivity {

  MaterialButton btn_login;
  TextInputEditText email, pwd;

  TextView register_now;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_login);
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main), (v, insets) -> {
            Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom);
            return insets;
        });
        btn_login=findViewById(R.id.btn_login);
        email=findViewById(R.id.email);
        pwd=findViewById(R.id.password);
        register_now=findViewById(R.id.register_now);

        btn_login.setOnClickListener(new View.OnClickListener() {
          @Override
          public void onClick(View v) {
            String txt_email, txt_pwd;
            txt_email=email.getText().toString();
            txt_pwd=pwd.getText().toString();

            if(TextUtils.isEmpty(txt_email)){
              Toast.makeText(Login.this, "Escriba su correo", Toast.LENGTH_LONG);
            }
            if(TextUtils.isEmpty(txt_pwd)){
              Toast.makeText(Login.this, "Escriba su contraseña", Toast.LENGTH_LONG);
            }
          }
        });

        register_now.setOnClickListener(new View.OnClickListener() {
          @Override
          public void onClick(View v) {
            Intent i=new Intent(getApplicationContext(), Register.class);
            startActivity(i);
            finish();
          }
        });
    }
}
