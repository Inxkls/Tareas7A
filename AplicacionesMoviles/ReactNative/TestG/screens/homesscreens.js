// screens/HomeScreen.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView
} from 'react-native';

const HomeScreen = ({ navigation }) => {
  const currentDate = new Date().toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2563eb" />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>¡Bienvenido!</Text>
          <Text style={styles.date}>{currentDate}</Text>
        </View>

        <View style={styles.cardContainer}>
          <TouchableOpacity
            style={[styles.card, styles.notesCard]}
            onPress={() => navigation.navigate('Notes')}
          >
            <Text style={styles.cardIcon}>📝</Text>
            <Text style={styles.cardTitle}>Notas</Text>
            <Text style={styles.cardDescription}>
              Guarda tus pensamientos e ideas importantes
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.card, styles.weatherCard]}
            onPress={() => navigation.navigate('Weather')}
          >
            <Text style={styles.cardIcon}>🌤️</Text>
            <Text style={styles.cardTitle}>Clima</Text>
            <Text style={styles.cardDescription}>
              Consulta el pronóstico del tiempo
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.card, styles.calendarCard]}
            onPress={() => navigation.navigate('Calendar')}
          >
            <Text style={styles.cardIcon}>📅</Text>
            <Text style={styles.cardTitle}>Calendario</Text>
            <Text style={styles.cardDescription}>
              Organiza tus eventos y recordatorios
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f5f9',
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    marginBottom: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 5,
  },
  date: {
    fontSize: 16,
    color: '#64748b',
    textTransform: 'capitalize',
  },
  cardContainer: {
    gap: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    borderLeftWidth: 4,
  },
  notesCard: {
    borderLeftColor: '#f59e0b',
  },
  weatherCard: {
    borderLeftColor: '#06b6d4',
  },
  calendarCard: {
    borderLeftColor: '#10b981',
  },
  cardIcon: {
    fontSize: 40,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
  },
});

export default HomeScreen;
