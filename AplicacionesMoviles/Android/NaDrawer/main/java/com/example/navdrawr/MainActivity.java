package com.example.navdrawr;

import android.os.Bundle;
import android.view.MenuItem;
import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;
import androidx.core.view.GravityCompat;
import androidx.drawerlayout.widget.DrawerLayout;
import androidx.navigation.NavController;
import androidx.navigation.Navigation;
import androidx.navigation.ui.AppBarConfiguration;
import androidx.navigation.ui.NavigationUI;
import com.google.android.material.navigation.NavigationView;

public class MainActivity extends AppCompatActivity {

  private AppBarConfiguration mAppBarConfiguration;
  private DrawerLayout drawer;

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);

    Toolbar toolbar = findViewById(R.id.toolbar);
    setSupportActionBar(toolbar);

    drawer = findViewById(R.id.drawer_layout);
    NavigationView navigationView = findViewById(R.id.nav_view);

    NavController navController = Navigation.findNavController(this, R.id.nav_host_fragment);

    mAppBarConfiguration = new AppBarConfiguration.Builder(
      R.id.nav_tip, R.id.nav_currency, R.id.nav_imc, R.id.nav_weather)
      .setOpenableLayout(drawer)
      .build();

    NavigationUI.setupActionBarWithNavController(this, navController, mAppBarConfiguration);
    NavigationUI.setupWithNavController(navigationView, navController);

    navigationView.setNavigationItemSelectedListener(new NavigationView.OnNavigationItemSelectedListener() {
      @Override
      public boolean onNavigationItemSelected(@NonNull MenuItem item) {
        int id = item.getItemId();
        if (id == R.id.nav_exit) {
          finishAffinity();
          return true;
        }
        boolean handled = NavigationUI.onNavDestinationSelected(item, navController);
        if (handled) {
          drawer.closeDrawer(GravityCompat.START);
        }
        return handled;
      }
    });
  }

  @Override
  public boolean onSupportNavigateUp() {
    NavController navController = Navigation.findNavController(this, R.id.nav_host_fragment);
    return NavigationUI.navigateUp(navController, mAppBarConfiguration)
      || super.onSupportNavigateUp();
  }
}
