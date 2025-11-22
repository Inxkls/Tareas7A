// screens/CalendarScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert
} from 'react-native';

const CalendarScreen = () => {
  const [events, setEvents] = useState([
    { id: 1, title: 'Reunión de trabajo', date: '2025-09-08', time: '10:00' },
    { id: 2, title: 'Cita médica', date: '2025-09-10', time: '15:30' },
    { id: 3, title: 'Cumpleaños de María', date: '2025-09-15', time: '18:00' }
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventDate, setNewEventDate] = useState('');
  const [newEventTime, setNewEventTime] = useState('');

  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleDateString('es-ES', {
    month: 'long',
    year: 'numeric'
  });

  // Generar días del mes actual
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const generateCalendarDays = () => {
    const days = [];
    const today = currentDate.getDate();

    // Días vacíos al inicio
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push({ day: null, isToday: false, hasEvent: false });
    }

    // Días del mes
    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = `2025-09-${day.toString().padStart(2, '0')}`;
      const hasEvent = events.some(event => event.date === dateString);
      days.push({
        day,
        isToday: day === today,
        hasEvent,
        dateString
      });
    }

    return days;
  };

  const addEvent = () => {
    if (!newEventTitle.trim() || !newEventDate.trim() || !newEventTime.trim()) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    const newEvent = {
      id: Date.now(),
      title: newEventTitle,
      date: newEventDate,
      time: newEventTime
    };

    setEvents([...events, newEvent].sort((a, b) => new Date(a.date) - new Date(b.date)));
    setNewEventTitle('');
    setNewEventDate('');
    setNewEventTime('');
    setModalVisible(false);
  };

  const deleteEvent = (id) => {
    Alert.alert(
      'Eliminar evento',
      '¿Estás seguro de que quieres eliminar este evento?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Eliminar', style: 'destructive', onPress: () => {
            setEvents(events.filter(event => event.id !== id));
          }}
      ]
    );
  };

  const calendarDays = generateCalendarDays();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.monthTitle}>{currentMonth}</Text>
          <TouchableOpacity
            style={styles.addEventButton}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.addEventButtonText}>+ Evento</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.calendar}>
          <View style={styles.weekDays}>
            {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map((day) => (
              <Text key={day} style={styles.weekDay}>{day}</Text>
            ))}
          </View>

          <View style={styles.daysGrid}>
            {calendarDays.map((dayInfo, index) => (
              <View key={index} style={styles.dayContainer}>
                {dayInfo.day && (
                  <View style={[
                    styles.day,
                    dayInfo.isToday && styles.today,
                    dayInfo.hasEvent && styles.hasEvent
                  ]}>
                    <Text style={[
                      styles.dayText,
                      dayInfo.isToday && styles.todayText,
                      dayInfo.hasEvent && styles.hasEventText
                    ]}>
                      {dayInfo.day}
                    </Text>
                    {dayInfo.hasEvent && <View style={styles.eventDot} />}
                  </View>
                )}
              </View>
            ))}
          </View>
        </View>

        <View style={styles.eventsSection}>
          <Text style={styles.sectionTitle}>Próximos eventos</Text>

          {events.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>No hay eventos programados</Text>
            </View>
          ) : (
            events.map((event) => (
              <View key={event.id} style={styles.eventCard}>
                <View style={styles.eventInfo}>
                  <Text style={styles.eventTitle}>{event.title}</Text>
                  <Text style={styles.eventDateTime}>
                    {new Date(event.date).toLocaleDateString('es-ES')} - {event.time}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => deleteEvent(event.id)}
                  style={styles.deleteButton}
                >
                  <Text style={styles.deleteButtonText}>🗑️</Text>
                </TouchableOpacity>
              </View>
            ))
          )}
        </View>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Nuevo Evento</Text>

            <TextInput
              style={styles.input}
              placeholder="Título del evento"
              value={newEventTitle}
              onChangeText={setNewEventTitle}
            />

            <TextInput
              style={styles.input}
              placeholder="Fecha (YYYY-MM-DD)"
              value={newEventDate}
              onChangeText={setNewEventDate}
            />

            <TextInput
              style={styles.input}
              placeholder="Hora (HH:MM)"
              value={newEventTime}
              onChangeText={setNewEventTime}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, styles.saveButton]}
                onPress={addEvent}
              >
                <Text style={styles.saveButtonText}>Guardar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fdf8',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  monthTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    textTransform: 'capitalize',
  },
  addEventButton: {
    backgroundColor: '#10b981',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  addEventButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  calendar: {
    backgroundColor: 'white',
    marginHorizontal: 15,
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  weekDays: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  weekDay: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#6b7280',
    textAlign: 'center',
    width: 35,
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayContainer: {
    width: '14.28%',
    alignItems: 'center',
    marginVertical: 5,
  },
  day: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  today: {
    backgroundColor: '#10b981',
  },
  hasEvent: {
    backgroundColor: '#fef3c7',
  },
  dayText: {
    fontSize: 14,
    color: '#374151',
  },
  todayText: {
    color: 'white',
    fontWeight: 'bold',
  },
  hasEventText: {
    color: '#92400e',
    fontWeight: '500',
  },
  eventDot: {
    position: 'absolute',
    bottom: 2,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#f59e0b',
  },
  eventsSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 15,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#6b7280',
  },
  eventCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  eventInfo: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  eventDateTime: {
    fontSize: 14,
    color: '#6b7280',
  },
  deleteButton: {
    padding: 8,
  },
  deleteButtonText: {
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    margin: 20,
    width: '90%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginTop: 10,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#e5e7eb',
  },
  saveButton: {
    backgroundColor: '#10b981',
  },
  cancelButtonText: {
    color: '#374151',
    fontWeight: '500',
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default CalendarScreen;
