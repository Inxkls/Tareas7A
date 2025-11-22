import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';

// Ancho del drawer (75% de la pantalla)
const DRAWER_WIDTH = 280;

// --- COMPONENTE DEL DRAWER ---
// Lo definimos aquí mismo para mantenerlo simple
const DrawerContent = ({ onClose }) => {
  const menuItems = ['Perfil', 'Faltas', 'Calificaciones', 'Horario'];
  return (
    // Touchable para evitar que el clic en el drawer lo cierre
    <TouchableOpacity activeOpacity={1} style={styles.drawer}>
      <SafeAreaView>
        <Text style={styles.drawerTitle}>Menú</Text>
        {menuItems.map((item) => (
          <TouchableOpacity key={item} style={styles.menuItem} onPress={onClose}>
            <Text style={styles.menuItemText}>{item}</Text>
          </TouchableOpacity>
        ))}
      </SafeAreaView>
    </TouchableOpacity>
  );
};

// --- PANTALLA PRINCIPAL ---
export default function App() {
  // 1. Estado para saber si el drawer está abierto o cerrado
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{ flex: 1 }}>
        {/* 2. Contenido principal de la app */}
        <View style={styles.mainContent}>
          <TouchableOpacity
            style={styles.openButton}
            onPress={() => setIsDrawerOpen(true)}
          >
            <Text style={styles.openButtonText}>☰ Abrir Menú</Text>
          </TouchableOpacity>
          <Text style={styles.contentText}>Un Icecc de temu</Text>
        </View>

        {/* 3. El Drawer y el fondo oscuro (solo se muestran si isDrawerOpen es true) */}
        {isDrawerOpen && (
          <TouchableOpacity
            style={styles.overlay}
            activeOpacity={1}
            onPress={() => setIsDrawerOpen(false)} // Cierra el drawer al tocar fuera
          >
            <DrawerContent onClose={() => setIsDrawerOpen(false)} />
          </TouchableOpacity>
        )}
      </SafeAreaView>
    </View>
  );
}

// --- ESTILOS ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  openButton: {
    backgroundColor: '#808080',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 0,
  },
  openButtonText: {
    color: 'white',
    fontSize: 18,
  },
  contentText: {
    marginTop: 20,
    fontSize: 20,
  },
  // Estilos del Drawer
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  drawer: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: DRAWER_WIDTH,
    backgroundColor: '#333',
  },
  drawerTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    padding: 20,
    backgroundColor: '#222',
  },
  menuItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
  },
  menuItemText: {
    color: 'white',
    fontSize: 18,
  },
});
