import React, { useRef, useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Animated } from 'react-native';

const AlbumItem = ({ album, onDelete, onSelect }) => {
  const [imageError, setImageError] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Reinicia la animación y el estado de error si el item cambia
    setImageError(false);
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [album.id]); // Se ejecuta cuando el álbum específico cambia

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      {/* CORRECCIÓN: Se envuelve la función onSelect en una función de flecha 
        para pasar el objeto 'album' completo al ser presionado.
        Antes: onPress={onSelect}
        Ahora: onPress={() => onSelect(album)}
      */}
      <TouchableOpacity onPress={() => onSelect(album)} style={styles.touchableContent}>
        {imageError || !album.image ? (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderIcon}>♫</Text>
          </View>
        ) : (
          <Image
            source={{ uri: album.image }}
            style={styles.albumImage}
            onError={handleImageError}
          />
        )}
        <View style={styles.textContainer}>
          <Text style={styles.albumName} numberOfLines={1}>{album.name}</Text>
          <Text style={styles.artistName} numberOfLines={1}>{album.artist}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.deleteButton} onPress={() => onDelete(album.id)}>
        <Text style={styles.deleteButtonText}>×</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 8,
    borderRadius: 8,
    backgroundColor: '#1C1C1C',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  touchableContent: {
    width: '100%',
  },
  albumImage: {
    width: '100%',
    aspectRatio: 1,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  placeholder: {
    width: '100%',
    aspectRatio: 1,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: '#282828',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderIcon: {
    fontSize: 50,
    color: '#555',
  },
  textContainer: {
    padding: 10,
  },
  albumName: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  artistName: {
    color: '#B3B3B3',
    fontSize: 12,
  },
  deleteButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 22,
  },
});

export default AlbumItem;
