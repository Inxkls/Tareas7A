// screens/WeatherScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ActivityIndicator
} from 'react-native';

const WeatherScreen = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulamos una llamada a API de clima
    const fetchWeather = () => {
      setTimeout(() => {
        setWeatherData({
          city: 'Veracruz, México',
          temperature: 28,
          condition: 'Parcialmente nublado',
          humidity: 65,
          windSpeed: 12,
          uvIndex: 6,
          forecast: [
            { day: 'Hoy', high: 28, low: 22, condition: '⛅' },
            { day: 'Mañana', high: 30, low: 24, condition: '☀️' },
            { day: 'Miércoles', high: 26, low: 20, condition: '🌧️' },
            { day: 'Jueves', high: 29, low: 23, condition: '☀️' },
            { day: 'Viernes', high: 27, low: 21, condition: '⛅' },
          ]
        });
        setLoading(false);
      }, 1500);
    };

    fetchWeather();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#06b6d4" />
          <Text style={styles.loadingText}>Cargando información del clima...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.currentWeather}>
          <Text style={styles.cityName}>{weatherData.city}</Text>
          <Text style={styles.temperature}>{weatherData.temperature}°C</Text>
          <Text style={styles.condition}>{weatherData.condition}</Text>
          <Text style={styles.weatherIcon}>⛅</Text>
        </View>

        <View style={styles.detailsContainer}>
          <Text style={styles.sectionTitle}>Detalles del clima</Text>

          <View style={styles.detailsGrid}>
            <View style={styles.detailCard}>
              <Text style={styles.detailIcon}>💧</Text>
              <Text style={styles.detailLabel}>Humedad</Text>
              <Text style={styles.detailValue}>{weatherData.humidity}%</Text>
            </View>

            <View style={styles.detailCard}>
              <Text style={styles.detailIcon}>💨</Text>
              <Text style={styles.detailLabel}>Viento</Text>
              <Text style={styles.detailValue}>{weatherData.windSpeed} km/h</Text>
            </View>

            <View style={styles.detailCard}>
              <Text style={styles.detailIcon}>☀️</Text>
              <Text style={styles.detailLabel}>Índice UV</Text>
              <Text style={styles.detailValue}>{weatherData.uvIndex}</Text>
            </View>
          </View>
        </View>

        <View style={styles.forecastContainer}>
          <Text style={styles.sectionTitle}>Pronóstico de 5 días</Text>

          {weatherData.forecast.map((day, index) => (
            <View key={index} style={styles.forecastDay}>
              <Text style={styles.forecastDayName}>{day.day}</Text>
              <Text style={styles.forecastIcon}>{day.condition}</Text>
              <View style={styles.forecastTemps}>
                <Text style={styles.forecastHigh}>{day.high}°</Text>
                <Text style={styles.forecastLow}>{day.low}°</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f9ff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#64748b',
  },
  scrollContent: {
    padding: 20,
  },
  currentWeather: {
    backgroundColor: '#06b6d4',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    marginBottom: 20,
  },
  cityName: {
    fontSize: 18,
    color: 'white',
    fontWeight: '500',
    marginBottom: 10,
  },
  temperature: {
    fontSize: 48,
    color: 'white',
    fontWeight: 'bold',
  },
  condition: {
    fontSize: 16,
    color: 'white',
    opacity: 0.9,
    marginBottom: 10,
  },
  weatherIcon: {
    fontSize: 60,
  },
  detailsContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 15,
  },
  detailsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  detailCard: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  detailIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 12,
    color: '#64748b',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  forecastContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  forecastDay: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  forecastDayName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1e293b',
    flex: 1,
  },
  forecastIcon: {
    fontSize: 24,
    marginRight: 20,
  },
  forecastTemps: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  forecastHigh: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  forecastLow: {
    fontSize: 16,
    color: '#64748b',
  },
});

export default WeatherScreen;
